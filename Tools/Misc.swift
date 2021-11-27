//
//  Misc.swift
//  NobelLaureates
//
//  Created by Pontus Östlund on 2021-11-27.
//

import Foundation

/// Print to `stdout` when in `DEBUG` mode
func debugPrint(
  _ items: Any...,
  separator: String = " ",
  terminator: String = "\n"
) {
#if DEBUG
  items.forEach {
    Swift.print($0, separator: separator, terminator: terminator)
  }
#endif
}
