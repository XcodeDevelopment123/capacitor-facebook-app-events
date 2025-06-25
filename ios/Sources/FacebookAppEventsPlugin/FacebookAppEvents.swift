import Foundation

@objc public class FacebookAppEvents: NSObject {
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
}
