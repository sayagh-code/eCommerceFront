import {
  __commonJS
} from "./chunk-MJYVQZOT.js";

// node_modules/angular2-uuid/index.js
var require_angular2_uuid = __commonJS({
  "node_modules/angular2-uuid/index.js"(exports) {
    var UUID = function() {
      function UUID2() {
      }
      UUID2.UUID = function() {
        if (typeof window !== "undefined" && typeof window.crypto !== "undefined" && typeof window.crypto.getRandomValues !== "undefined") {
          var buf = new Uint16Array(8);
          window.crypto.getRandomValues(buf);
          return this.pad4(buf[0]) + this.pad4(buf[1]) + "-" + this.pad4(buf[2]) + "-" + this.pad4(buf[3]) + "-" + this.pad4(buf[4]) + "-" + this.pad4(buf[5]) + this.pad4(buf[6]) + this.pad4(buf[7]);
        } else {
          return this.random4() + this.random4() + "-" + this.random4() + "-" + this.random4() + "-" + this.random4() + "-" + this.random4() + this.random4() + this.random4();
        }
      };
      UUID2.pad4 = function(num) {
        var ret = num.toString(16);
        while (ret.length < 4) {
          ret = "0" + ret;
        }
        return ret;
      };
      UUID2.random4 = function() {
        return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
      };
      return UUID2;
    }();
    exports.UUID = UUID;
  }
});
export default require_angular2_uuid();
//# sourceMappingURL=angular2-uuid.js.map
