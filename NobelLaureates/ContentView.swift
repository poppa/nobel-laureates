//
//  ContentView.swift
//  NobelLaureates
//
//  Created by Pontus Östlund on 2021-11-28.
//

import SwiftUI
import Combine

struct ContentView: View {
  @ObservedObject var networkManager: NetworkManager

  var body: some View {
    NavigationView {
      List(networkManager.laureates.laureates, id: \.id) { laureate in
        NavigationLink {
          LaureateView(laureate: laureate)
        } label: {
          Text("\(laureate.firstname) \(laureate.surname ?? "(none)")")
        }
      }.navigationBarTitle("Laureates")
    }
  }
}

struct ContentView_Previews: PreviewProvider {
  static var previews: some View {
    ContentView(networkManager: NetworkManager(inMemory: true))
  }
}
