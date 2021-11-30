//
//  NobelLaureatesApp.swift
//  NobelLaureates
//
//  Created by Pontus Östlund on 2021-11-28.
//

import SwiftUI

@main
struct NobelLaureatesApp: App {
  var body: some Scene {
    WindowGroup {
      ContentView(networkManager: NetworkManager())
    }
  }
}
