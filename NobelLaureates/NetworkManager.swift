//
//  NetworkManager.swift
//  NobelLaureates
//
//  Created by Pontus Östlund on 2021-11-28.
//

import Foundation
import Combine
import SwiftUI

class NetworkManager: ObservableObject {
  @Published var laureates = Laureates(laureates: [])

  init(inMemory: Bool = false) {
    if inMemory {
      let data = """
      {
      "laureates": [
      {
      "id": "1",
      "firstname": "Wilhelm Conrad",
      "surname": "R\u{00f6}ntgen",
      "born": "1845-03-27",
      "died": "1923-02-10",
      "bornCountry": "Prussia (now Germany)",
      "bornCountryCode": "DE",
      "bornCity": "Lennep (now Remscheid)",
      "diedCountry": "Germany",
      "diedCountryCode": "DE",
      "diedCity": "Munich",
      "gender": "male",
      "prizes": [
        {
          "year": "1901",
          "category": "physics",
          "share": "1",
          "motivation": "in recognition of the extraordinary services he has rendered by the discovery of the remarkable rays subsequently named after him",
          "affiliations": [
            {
              "name": "Munich University",
              "city": "Munich",
              "country": "Germany"
            }
          ]
        }
      ]
      },
      {
      "id": "2",
      "firstname": "Hendrik A.",
      "surname": "Lorentz",
      "born": "1853-07-18",
      "died": "1928-02-04",
      "bornCountry": "the Netherlands",
      "bornCountryCode": "NL",
      "bornCity": "Arnhem",
      "diedCountry": "the Netherlands",
      "diedCountryCode": "NL",
      "gender": "male",
      "prizes": [
        {
          "year": "1902",
          "category": "physics",
          "share": "2",
          "motivation": "in recognition of the extraordinary service they rendered by their researches into the influence of magnetism upon radiation phenomena",
          "affiliations": [
            {
              "name": "Leiden University",
              "city": "Leiden",
              "country": "the Netherlands"
            }
          ]
        }
      ]
      },
      {
      "id": "3",
      "firstname": "Pieter",
      "surname": "Zeeman",
      "born": "1865-05-25",
      "died": "1943-10-09",
      "bornCountry": "the Netherlands",
      "bornCountryCode": "NL",
      "bornCity": "Zonnemaire",
      "diedCountry": "the Netherlands",
      "diedCountryCode": "NL",
      "diedCity": "Amsterdam",
      "gender": "male",
      "prizes": [
        {
          "year": "1902",
          "category": "physics",
          "share": "2",
          "motivation": "in recognition of the extraordinary service they rendered by their researches into the influence of magnetism upon radiation phenomena",
          "affiliations": [
            {
              "name": "Amsterdam University",
              "city": "Amsterdam",
              "country": "the Netherlands"
            }
          ]
        }
      ]
      }
      ]
      }
      """

      let jsonData = data.data(using: String.Encoding.utf16)!
      let laureates = try! JSONDecoder().decode(Laureates.self, from: jsonData)

      self.laureates = laureates

    } else {
      guard let url = URL(string: "https://api.nobelprize.org/v1/laureate.json")
      else { return }

      debugPrint("Init networkmanager with \(url)")

      URLSession.shared.dataTask(with: url) { (data, _, _) in
        guard let data = data else { return }
        let laureates = try! JSONDecoder().decode(Laureates.self, from: data)

        DispatchQueue.main.async {
          debugPrint("Length: \(laureates.laureates.count)")
          self.laureates = laureates
        }
      }.resume()
    }
  }
}
