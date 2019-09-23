/* timingSystem.js
 *
 * Author: Bridger Herman (herma582@umn.edu)
 * Copyright (c) 2019, University of Minnesota
 *
 * Keeps track of time per-frame
 */

class TimingSystem {
    static tick() {
        TimingSystem._prevTime = window.performance.now();
    }

    // Microsecond time
    static dt() {
        return window.performance.now() - TimingSystem._prevTime;
    }

    static dt_ms() {
        return TimingSystem.dt() / 1000.0;
    }
}

TimingSystem._prevTime = window.performance.now();
