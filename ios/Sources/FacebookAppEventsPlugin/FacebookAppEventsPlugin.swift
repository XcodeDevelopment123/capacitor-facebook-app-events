import Foundation
import Capacitor
import FBSDKCoreKit
import AppTrackingTransparency
import AdSupport

@objc(FacebookAppEventsPlugin)
public class FacebookAppEventsPlugin: CAPPlugin , CAPBridgedPlugin {
    public let identifier = "FacebookAppEventsPlugin"
    public let jsName = "FacebookAppEvents"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "initialize", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "isInitialized", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "logEvent", returnType: CAPPluginReturnPromise)

    ]

    private var initialized = false
    private static let TAG = "FacebookAppEvents"

 @objc func initialize(_ call: CAPPluginCall) {
        guard let appId = call.getString("appId"),
              let clientToken = call.getString("clientToken") else {
            call.reject("Missing or empty appId or clientToken")
            return
        }

        if appId.isEmpty {
            call.reject("Missing or empty appId")
            return
        }

        if clientToken.isEmpty {
            call.reject("Missing or empty clientToken")
            return
        }

        do {
            // Configure Facebook SDK
            Settings.shared.appID = appId
            Settings.shared.clientToken = clientToken
            Settings.shared.isAutoInitEnabled = true
            Settings.shared.isAutoLogAppEventsEnabled = true

            // Enable debug logging in debug builds
            #if DEBUG
            Settings.shared.isLoggingBehaviorEnabled = true
            Settings.shared.loggingBehaviors = [.appEvents]
            #endif

            // Request tracking authorization for iOS 14+
            if #available(iOS 14, *) {
                ATTrackingManager.requestTrackingAuthorization { status in
                    switch status {
                    case .authorized:
                        let idfa = ASIdentifierManager.shared().advertisingIdentifier
                        print("\(Self.TAG): IDFA authorized: \(idfa)")
                    case .denied, .restricted, .notDetermined:
                        print("\(Self.TAG): Tracking authorization not granted")
                    @unknown default:
                        break
                    }
                }
            }

            // Initialize SDK
            ApplicationDelegate.shared.initializeSDK()
            
            // Activate app
            AppEvents.shared.activateApp()

            initialized = true
            print("\(Self.TAG): Facebook SDK initialized successfully")
            call.resolve()
        } catch {
            print("\(Self.TAG): Failed to initialize Facebook SDK: \(error)")
            call.reject("Failed to initialize Facebook SDK: \(error.localizedDescription)")
        }
    }

    @objc func isInitialized(_ call: CAPPluginCall) {
        let isSDKInitialized = Settings.shared.appID != nil && !Settings.shared.appID!.isEmpty
        call.resolve(["initialized": initialized && isSDKInitialized])
    }

    @objc func logEvent(_ call: CAPPluginCall) {
        if !initialized {
            call.reject("Facebook SDK not initialized. Call initialize() first.")
            return
        }

        if !ensureSDKInitialized() {
            call.reject("Facebook SDK not properly initialized")
            return
        }

        guard let eventName = call.getString("eventName") else {
            call.reject("Missing or empty 'eventName'")
            return
        }

        if eventName.isEmpty {
            call.reject("Missing or empty 'eventName'")
            return
        }

        let valueToSum = call.getDouble("valueToSum")
        let parameters = call.getObject("parameters") ?? [:]

        do {
            let fbParams = try createParametersFromDictionary(parameters)

            // Handle standard Facebook events with special processing
            if isPurchaseEvent(eventName) {
                try logPurchaseEvent(eventName: eventName, valueToSum: valueToSum, parameters: fbParams, call: call)
            } else {
                logStandardEvent(eventName: eventName, valueToSum: valueToSum, parameters: fbParams)
                call.resolve()
            }
        } catch {
            print("\(Self.TAG): Error logging event: \(eventName), error: \(error)")
            call.reject("Failed to log event: \(error.localizedDescription)")
        }
    }

    private func createParametersFromDictionary(_ parameters: [String: Any]) throws -> [AppEvents.ParameterName: Any] {
        var fbParams: [AppEvents.ParameterName: Any] = [:]

        for (key, value) in parameters {
            let parameterName = AppEvents.ParameterName(rawValue: key)
            
            if let stringValue = value as? String {
                fbParams[parameterName] = stringValue
            } else if let intValue = value as? Int {
                fbParams[parameterName] = intValue
            } else if let doubleValue = value as? Double {
                fbParams[parameterName] = doubleValue
            } else if let boolValue = value as? Bool {
                fbParams[parameterName] = boolValue
            } else if let floatValue = value as? Float {
                fbParams[parameterName] = floatValue
            } else if let longValue = value as? Int64 {
                fbParams[parameterName] = longValue
            } else {
                // Convert other types to string as fallback
                fbParams[parameterName] = String(describing: value)
            }
        }

        return fbParams
    }

    private func isPurchaseEvent(_ eventName: String) -> Bool {
        return eventName == "fb_mobile_purchase" || 
               eventName == "Purchase" ||
               eventName == AppEvents.Name.purchased.rawValue
    }

    private func logPurchaseEvent(eventName: String, valueToSum: Double?, parameters: [AppEvents.ParameterName: Any], call: CAPPluginCall) throws {
        // For purchase events, we need currency information
        var currencyCode: String?
        
        if let fbCurrency = parameters[AppEvents.ParameterName(rawValue: "fb_currency")] as? String {
            currencyCode = fbCurrency
        } else if let currency = parameters[AppEvents.ParameterName(rawValue: "currency")] as? String {
            currencyCode = currency
        }

        guard let currency = currencyCode, !currency.isEmpty else {
            call.reject("'fb_currency' or 'currency' is required for purchase events")
            return
        }

        let amount = valueToSum ?? 0.0
        
        // Validate currency code
        let validCurrencies = Locale.isoCurrencyCodes
        if !validCurrencies.contains(currency.uppercased()) {
            call.reject("Invalid currency code: \(currency)")
            return
        }

        AppEvents.shared.logPurchase(amount: amount, currency: currency.uppercased(), parameters: parameters)
        AppEvents.shared.flush()

        print("\(Self.TAG): Purchase event logged: \(eventName), amount: \(amount), currency: \(currency)")
        call.resolve()
    }

    private func logStandardEvent(eventName: String, valueToSum: Double?, parameters: [AppEvents.ParameterName: Any]) {
        let eventAppName = AppEvents.Name(eventName)
        
        if let value = valueToSum {
            AppEvents.shared.logEvent(eventAppName, valueToSum: value, parameters: parameters)
        } else {
            AppEvents.shared.logEvent(eventAppName, parameters: parameters)
        }

        AppEvents.shared.flush()
        let valueText = valueToSum != nil ? ", value: \(valueToSum!)" : ""
        print("\(Self.TAG): Event logged: \(eventName)\(valueText)")
    }

    private func ensureSDKInitialized() -> Bool {
        guard let appId = Settings.shared.appID, !appId.isEmpty else {
            print("\(Self.TAG): Facebook SDK is not initialized")
            return false
        }

        return true
    }
}
