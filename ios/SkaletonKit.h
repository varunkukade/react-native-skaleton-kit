#ifdef RCT_NEW_ARCH_ENABLED
#import "generated/RNSkaletonKitSpec/RNSkaletonKitSpec.h"

@interface SkaletonKit : NSObject <NativeSkaletonKitSpec>
#else
#import <React/RCTBridgeModule.h>

@interface SkaletonKit: NSObject <RCTBridgeModule>

#endif

@end
