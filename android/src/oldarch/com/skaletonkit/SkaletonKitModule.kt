package com.skaletonkit;

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = SkaletonKitModuleImpl.NAME)
class SkaletonKitModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
  // declare an instance of the implementation and use it in all the methods
  private var implementation: SkaletonKitModuleImpl = SkaletonKitModuleImpl()

  override fun getName(): String = SkaletonKitModuleImpl.NAME

  @ReactMethod
  fun multiply(a: Double, b: Double): Double {
    // Use the implementation instance to execute the function.
   return implementation.multiply(a, b)
  }
}
