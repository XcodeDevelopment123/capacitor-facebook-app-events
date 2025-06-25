// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapacitorFacebookAppEvents",
    platforms: [.iOS(.v14)],
    products: [
        .library(
            name: "CapacitorFacebookAppEvents",
            targets: ["FacebookAppEventsPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "7.0.0")
    ],
    targets: [
        .target(
            name: "FacebookAppEventsPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/FacebookAppEventsPlugin"),
        .testTarget(
            name: "FacebookAppEventsPluginTests",
            dependencies: ["FacebookAppEventsPlugin"],
            path: "ios/Tests/FacebookAppEventsPluginTests")
    ]
)