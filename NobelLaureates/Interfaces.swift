//
//  Interfaces.swift
//  NobelLaureates
//
//  Created by Pontus Östlund on 2021-11-28.
//

import Foundation

struct Laureates: Decodable {
  var laureates: [Laureate]
}

struct Laureate: Decodable {
  var id: String
  var firstname: String
  var surname: String?
  var born: String?
  var died: String?
  var bornCountry: String?
  var bornCountryCode: String?
  var bornCity: String?
  var diedCountry: String?
  var diedCountryCode: String?
  var gender: String
  var prizes: [Prize]
}

struct Prize: Decodable {
  var year: String
  var category: String
  var share: String?
  var motivation: String
  var affiliations: [AffiliationWrapper]
}

enum AffiliationWrapper: Decodable {
  case ok(Affiliation)
  case empty

  init(from decoder: Decoder) throws {
    let container = try decoder.singleValueContainer()

    if let item = try? container.decode(Affiliation.self) {
      self = .ok(item)
    } else {
      self = .empty
    }
  }
}

struct Affiliation: Decodable {
  var name: String
  var city: String
  var country: String
}
