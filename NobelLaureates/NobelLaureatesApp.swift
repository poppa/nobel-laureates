//
//  NobelLaureatesApp.swift
//  NobelLaureates
//
//  Created by Pontus Östlund on 2021-11-27.
//

import SwiftUI

@main
struct NobelLaureatesApp: App {
  let persistenceController = PersistenceController.shared

  var body: some Scene {
    WindowGroup {
      ContentView()
        .environment(\.managedObjectContext, persistenceController.container.viewContext)
    }
  }
}
