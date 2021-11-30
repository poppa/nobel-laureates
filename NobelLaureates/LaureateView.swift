//
//  LaureateView.swift
//  NobelLaureates
//
//  Created by Pontus Östlund on 2021-11-30.
//

import Foundation
import SwiftUI


struct SimplePrizeView: View {
  var prize: Prize

  var body: some View {
    HStack {
      Text("\(prize.year) in \(prize.category)")
        .frame(
          maxWidth: .infinity,
          alignment: .leading
        )
    }
  }
}

struct LaureateView: View {
  var laureate: Laureate

  var body: some View {
    VStack {
      HStack {
        Image("\(laureate.gender == "female" ? "generic-female" : "generic-male")")
        VStack {
          Text("\(laureate.firstname) \(laureate.surname ?? "(hum)")")
            .font(/*@START_MENU_TOKEN@*/.title/*@END_MENU_TOKEN@*/)
            .frame(
              maxWidth: .infinity,
              alignment: .leading
            )

          ForEach(laureate.prizes, id: \.year) { prize in
            SimplePrizeView(prize: prize)
          }
        }.frame(alignment: .leading)
      }
      Spacer()
    }
  }
}
