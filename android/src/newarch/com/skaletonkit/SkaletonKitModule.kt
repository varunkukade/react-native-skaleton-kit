package com.skaletonkit;

import com.facebook.react.bridge.ReactApplicationContext

class SkaletonKitModule(reactContext: ReactApplicationContext) : NativeSkaletonKitSpec(reactContext) {
  // declare an instance of the implementation and use it in all the methods
  private var implementation: SkaletonKitModuleImpl = SkaletonKitModuleImpl()

  override fun getName(): String = SkaletonKitModuleImpl.NAME
  override fun multiply(a: Double, b: Double): Double {
    return implementation.multiply(a, b)
  }
}
