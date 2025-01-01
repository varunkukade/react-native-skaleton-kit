package com.skaletonkit;

import com.facebook.react.bridge.ReactApplicationContext

class SkaletonKitModule(reactContext: ReactApplicationContext) : NativeSkaletonKitSpec(reactContext) {
  // declare an instance of the implementation and use it in all the methods
  private var implementation: SkaletonKitModuleImpl = SkaletonKitModuleImpl()

  override fun getName(): String = SkaletonKitModuleImpl.NAME

  override fun multiple(a: Double, b: Double): Double {
    // Use the implementation instance to execute the function.
    implementation.multiple(a, b)
  }
}
