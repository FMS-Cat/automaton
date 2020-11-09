/*!
* @fms-cat/automaton-fxs v3.0.1
* Bunch of automaton fxs
*
* Copyright (c) 2020 FMS_Cat
* @fms-cat/automaton-fxs is distributed under MIT License
* https://github.com/FMS-Cat/automaton/blob/master/LICENSE
*/
const add = {
    name: 'Add',
    description: 'The simplest fx ever. Just add a constant value to the curve.',
    params: {
        value: { name: 'Value', type: 'float', default: 1.0 }
    },
    func(context) {
        return context.value + context.params.value;
    }
};

const cds = {
    name: 'Critically Damped Spring',
    description: 'Basically the best smoothing method. Shoutouts to Keijiro Takahashi',
    params: {
        factor: { name: 'Factor', type: 'float', default: 100.0, min: 0.0 },
        ratio: { name: 'Damp Ratio', type: 'float', default: 1.0 },
        preserve: { name: 'Preserve Velocity', type: 'boolean', default: false }
    },
    func(context) {
        const dt = context.deltaTime;
        const v = context.value;
        const k = context.params.factor;
        if (context.init) {
            context.state.pos = context.value;
            if (context.params.preserve) {
                const dv = v - context.getValue(context.time - dt);
                context.state.vel = dv / dt;
            }
            else {
                context.state.vel = 0.0;
            }
        }
        context.state.vel += (-k * (context.state.pos - v)
            - 2.0 * context.state.vel * Math.sqrt(k) * context.params.ratio) * dt;
        context.state.pos += context.state.vel * dt;
        return context.state.pos;
    }
};

function clamp(x, a, b) {
    return Math.min(Math.max(x, a), b);
}

function smin(a, b, k) {
    const h = Math.max(k - Math.abs(a - b), 0.0);
    return Math.min(a, b) - h * h * h / (6.0 * k * k);
}

const clamp$1 = {
    name: 'Clamp',
    description: 'Constrain the curve between two values, featuring smooth minimum.',
    params: {
        min: { name: 'Min', type: 'float', default: 0.0 },
        max: { name: 'Max', type: 'float', default: 1.0 },
        smooth: { name: 'Smooth', type: 'float', default: 0.0, min: 0.0 }
    },
    func(context) {
        if (context.params.smooth === 0.0) {
            return clamp(context.value, context.params.min, context.params.max);
        }
        const v = -smin(-context.params.min, -context.value, context.params.smooth);
        return smin(context.params.max, v, context.params.smooth);
    }
};

const exp = {
    name: 'Exponential Smoothing',
    description: 'Smooth the curve. Simple but good.',
    params: {
        factor: { name: 'Factor', type: 'float', default: 10.0, min: 0.0 }
    },
    func(context) {
        const v = context.value;
        if (context.init) {
            context.state.pos = v;
        }
        const k = Math.exp(-context.deltaTime * context.params.factor);
        context.state.pos = context.state.pos * k + v * (1.0 - k);
        return context.state.pos;
    }
};

const gravity = {
    name: 'Gravity',
    description: 'Accelerate and bounce the curve.',
    params: {
        a: { name: 'Acceleration', type: 'float', default: 9.8 },
        e: { name: 'Restitution', type: 'float', default: 0.5, min: 0.0 },
        preserve: { name: 'Preserve Velocity', type: 'boolean', default: false }
    },
    func(context) {
        const dt = context.deltaTime;
        const v = context.value;
        if (context.init) {
            context.state.pos = v;
            if (context.params.preserve) {
                const dv = v - context.getValue(context.time - dt);
                context.state.vel = dv / dt;
            }
            else {
                context.state.vel = 0.0;
            }
        }
        const a = Math.sign(v - context.state.pos) * context.params.a;
        context.state.vel += a * dt;
        context.state.pos += context.state.vel * dt;
        if (Math.sign(a) !== Math.sign(v - context.state.pos)) {
            context.state.vel *= -context.params.e;
            context.state.pos = v + context.params.e * (v - context.state.pos);
        }
        return context.state.pos;
    }
};

const hermitePatch = {
    name: 'Hermite Patch',
    description: 'Patch a curve using hermite spline.',
    params: {},
    func(context) {
        if (context.init) {
            const dt = context.deltaTime;
            const v0 = context.getValue(context.t0);
            const dv0 = v0 - context.getValue(context.t0 - dt);
            const v1 = context.getValue(context.t1);
            const dv1 = v1 - context.getValue(context.t1 - dt);
            context.state.p0 = v0;
            context.state.m0 = dv0 / dt * context.length;
            context.state.p1 = v1;
            context.state.m1 = dv1 / dt * context.length;
        }
        const { p0, m0, p1, m1 } = context.state;
        const t = context.progress;
        return (((2.0 * t - 3.0) * t * t + 1.0) * p0 +
            (((t - 2.0) * t + 1.0) * t) * m0 +
            ((-2.0 * t + 3.0) * t * t) * p1 +
            ((t - 1.0) * t * t) * m1);
    }
};

const lofi = {
    name: 'Lo-Fi',
    description: 'Make curve more crunchy.',
    params: {
        rate: { name: 'Frame Rate', type: 'float', default: 10.0, min: 0.0, max: 1000.0 },
        relative: { name: 'Relative', type: 'boolean', default: false },
        reso: { name: 'Reso Per Unit', type: 'float', default: 0.1, min: 0.0, max: 1000.0 },
        round: { name: 'Round', type: 'boolean', default: false }
    },
    func(context) {
        let t;
        if (context.params.rate === 0.0) {
            t = context.time;
        }
        else if (context.params.relative) {
            t = context.t0 + Math.floor((context.time - context.t0) * context.params.rate) / context.params.rate;
        }
        else {
            t = Math.floor((context.time) * context.params.rate) / context.params.rate;
        }
        let v = context.getValue(t);
        if (context.params.reso !== 0.0) {
            v = Math.floor(v * context.params.reso + (context.params.round ? 0.5 : 0.0)) / context.params.reso;
        }
        return v;
    }
};

function smoothstep(a, b, k) {
    const smooth = k * k * (3.0 - 2.0 * k);
    return a + (b - a) * smooth;
}

class Xorshift {
    constructor(seed) {
        this.__seed = 1;
        this.set(seed);
    }
    gen(seed) {
        if (seed) {
            this.set(seed);
        }
        this.__seed = this.__seed ^ (this.__seed << 13);
        this.__seed = this.__seed ^ (this.__seed >>> 17);
        this.__seed = this.__seed ^ (this.__seed << 5);
        return this.__seed / Math.pow(2, 32) + 0.5;
    }
    set(seed = 1) {
        this.__seed = seed;
    }
}

const xorshift = new Xorshift();
const noise = {
    name: 'Fractal Noise',
    description: 'wiggle()',
    params: {
        recursion: { name: 'Recursion', type: 'int', default: 4, min: 1, max: 99 },
        freq: { name: 'Frequency', type: 'float', default: 1.0, min: 0.0 },
        reso: { name: 'Resolution', type: 'float', default: 8.0, min: 1.0 },
        seed: { name: 'Seed', type: 'int', default: 1, min: 0 },
        amp: { name: 'Amp', type: 'float', default: 0.2 }
    },
    func(context) {
        if (context.init) {
            xorshift.gen(context.params.seed);
            context.state.table = new Float32Array(Math.floor(context.params.reso) + 2);
            for (let i = 1; i < context.params.reso; i++) {
                context.state.table[i] = xorshift.gen() * 2.0 - 1.0;
            }
        }
        let v = context.value;
        const p = context.progress;
        for (let i = 0; i < context.params.recursion; i++) {
            const index = (p * context.params.freq * context.params.reso * Math.pow(2.0, i)) % context.params.reso;
            const indexi = Math.floor(index);
            const indexf = index - indexi;
            const factor = Math.pow(0.5, i + 1.0);
            v += context.params.amp * factor * smoothstep(context.state.table[indexi], context.state.table[indexi + 1], indexf);
        }
        return v;
    }
};

const pow = {
    name: 'Power',
    description: 'You got boost power!',
    params: {
        pow: { name: 'Power', type: 'float', default: 2.0 },
        bias: { name: 'Bias', type: 'float', default: 0.0 },
        positive: { name: 'Force Positive', type: 'boolean', default: false }
    },
    func(context) {
        const v = context.value - context.params.bias;
        const sign = context.params.positive ? 1.0 : Math.sign(v);
        return Math.pow(Math.abs(v), context.params.pow) * sign + context.params.bias;
    }
};

const repeat = {
    name: 'Repeat',
    description: 'Repeat a section of the curve.',
    params: {
        interval: { name: 'Interval', type: 'float', default: 1.0, min: 0.0 },
    },
    func(context) {
        return context.getValue(context.t0 + context.elapsed % context.params.interval);
    }
};

const TAU = Math.PI * 2.0;
const sine = {
    name: 'Sinewave',
    description: 'Overlay a sinewave to the curve.',
    params: {
        amp: { name: 'Amp', type: 'float', default: 0.1 },
        freq: { name: 'Frequency', type: 'float', default: 5.0 },
        phase: { name: 'Phase', type: 'float', default: 0.0, min: 0.0, max: 1.0 }
    },
    func(context) {
        const v = context.value;
        const p = context.progress * context.params.freq + context.params.phase;
        return v + context.params.amp * Math.sin(p * TAU);
    }
};

export { add, cds, clamp$1 as clamp, exp, gravity, hermitePatch, lofi, noise, pow, repeat, sine };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b21hdG9uLWZ4cy5tb2R1bGUuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9meHMvYWRkLnRzIiwiLi4vc3JjL2Z4cy9jZHMudHMiLCIuLi9zcmMvZnhzL3V0aWxzL2NsYW1wLnRzIiwiLi4vc3JjL2Z4cy91dGlscy9zbWluLnRzIiwiLi4vc3JjL2Z4cy9jbGFtcC50cyIsIi4uL3NyYy9meHMvZXhwLnRzIiwiLi4vc3JjL2Z4cy9ncmF2aXR5LnRzIiwiLi4vc3JjL2Z4cy9oZXJtaXRlUGF0Y2gudHMiLCIuLi9zcmMvZnhzL2xvZmkudHMiLCIuLi9zcmMvZnhzL3V0aWxzL3Ntb290aHN0ZXAudHMiLCIuLi9zcmMvZnhzL3V0aWxzL3hvcnNoaWZ0LnRzIiwiLi4vc3JjL2Z4cy9ub2lzZS50cyIsIi4uL3NyYy9meHMvcG93LnRzIiwiLi4vc3JjL2Z4cy9yZXBlYXQudHMiLCIuLi9zcmMvZnhzL3NpbmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBGeERlZmluaXRpb24gfSBmcm9tICdAZm1zLWNhdC9hdXRvbWF0b24nO1xuXG5leHBvcnQgY29uc3QgYWRkOiBGeERlZmluaXRpb24gPSB7XG4gIG5hbWU6ICdBZGQnLFxuICBkZXNjcmlwdGlvbjogJ1RoZSBzaW1wbGVzdCBmeCBldmVyLiBKdXN0IGFkZCBhIGNvbnN0YW50IHZhbHVlIHRvIHRoZSBjdXJ2ZS4nLFxuICBwYXJhbXM6IHtcbiAgICB2YWx1ZTogeyBuYW1lOiAnVmFsdWUnLCB0eXBlOiAnZmxvYXQnLCBkZWZhdWx0OiAxLjAgfVxuICB9LFxuICBmdW5jKCBjb250ZXh0ICkge1xuICAgIHJldHVybiBjb250ZXh0LnZhbHVlICsgY29udGV4dC5wYXJhbXMudmFsdWU7XG4gIH1cbn07XG4iLCJpbXBvcnQgdHlwZSB7IEZ4RGVmaW5pdGlvbiB9IGZyb20gJ0BmbXMtY2F0L2F1dG9tYXRvbic7XG5cbmV4cG9ydCBjb25zdCBjZHM6IEZ4RGVmaW5pdGlvbiA9IHtcbiAgbmFtZTogJ0NyaXRpY2FsbHkgRGFtcGVkIFNwcmluZycsXG4gIGRlc2NyaXB0aW9uOiAnQmFzaWNhbGx5IHRoZSBiZXN0IHNtb290aGluZyBtZXRob2QuIFNob3V0b3V0cyB0byBLZWlqaXJvIFRha2FoYXNoaScsXG4gIHBhcmFtczoge1xuICAgIGZhY3RvcjogeyBuYW1lOiAnRmFjdG9yJywgdHlwZTogJ2Zsb2F0JywgZGVmYXVsdDogMTAwLjAsIG1pbjogMC4wIH0sXG4gICAgcmF0aW86IHsgbmFtZTogJ0RhbXAgUmF0aW8nLCB0eXBlOiAnZmxvYXQnLCBkZWZhdWx0OiAxLjAgfSxcbiAgICBwcmVzZXJ2ZTogeyBuYW1lOiAnUHJlc2VydmUgVmVsb2NpdHknLCB0eXBlOiAnYm9vbGVhbicsIGRlZmF1bHQ6IGZhbHNlIH1cbiAgfSxcbiAgZnVuYyggY29udGV4dCApIHtcbiAgICBjb25zdCBkdCA9IGNvbnRleHQuZGVsdGFUaW1lO1xuICAgIGNvbnN0IHYgPSBjb250ZXh0LnZhbHVlO1xuICAgIGNvbnN0IGsgPSBjb250ZXh0LnBhcmFtcy5mYWN0b3I7XG5cbiAgICBpZiAoIGNvbnRleHQuaW5pdCApIHtcbiAgICAgIGNvbnRleHQuc3RhdGUucG9zID0gY29udGV4dC52YWx1ZTtcbiAgICAgIGlmICggY29udGV4dC5wYXJhbXMucHJlc2VydmUgKSB7XG4gICAgICAgIGNvbnN0IGR2ID0gdiAtIGNvbnRleHQuZ2V0VmFsdWUoIGNvbnRleHQudGltZSAtIGR0ICk7XG4gICAgICAgIGNvbnRleHQuc3RhdGUudmVsID0gZHYgLyBkdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRleHQuc3RhdGUudmVsID0gMC4wO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnRleHQuc3RhdGUudmVsICs9IChcbiAgICAgIC1rICogKCBjb250ZXh0LnN0YXRlLnBvcyAtIHYgKVxuICAgICAgLSAyLjAgKiBjb250ZXh0LnN0YXRlLnZlbCAqIE1hdGguc3FydCggayApICogY29udGV4dC5wYXJhbXMucmF0aW9cbiAgICApICogZHQ7XG4gICAgY29udGV4dC5zdGF0ZS5wb3MgKz0gY29udGV4dC5zdGF0ZS52ZWwgKiBkdDtcbiAgICByZXR1cm4gY29udGV4dC5zdGF0ZS5wb3M7XG4gIH1cbn07XG4iLCJleHBvcnQgZnVuY3Rpb24gY2xhbXAoIHg6IG51bWJlciwgYTogbnVtYmVyLCBiOiBudW1iZXIgKTogbnVtYmVyIHtcbiAgcmV0dXJuIE1hdGgubWluKCBNYXRoLm1heCggeCwgYSApLCBiICk7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gc21pbiggYTogbnVtYmVyLCBiOiBudW1iZXIsIGs6IG51bWJlciApOiBudW1iZXIge1xuICBjb25zdCBoID0gTWF0aC5tYXgoIGsgLSBNYXRoLmFicyggYSAtIGIgKSwgMC4wICk7XG4gIHJldHVybiBNYXRoLm1pbiggYSwgYiApIC0gaCAqIGggKiBoIC8gKCA2LjAgKiBrICogayApO1xufVxuIiwiaW1wb3J0IHsgY2xhbXAgYXMgcmF3Q2xhbXAgfSBmcm9tICcuL3V0aWxzL2NsYW1wJztcbmltcG9ydCB7IHNtaW4gfSBmcm9tICcuL3V0aWxzL3NtaW4nO1xuaW1wb3J0IHR5cGUgeyBGeERlZmluaXRpb24gfSBmcm9tICdAZm1zLWNhdC9hdXRvbWF0b24nO1xuXG5leHBvcnQgY29uc3QgY2xhbXA6IEZ4RGVmaW5pdGlvbiA9IHtcbiAgbmFtZTogJ0NsYW1wJyxcbiAgZGVzY3JpcHRpb246ICdDb25zdHJhaW4gdGhlIGN1cnZlIGJldHdlZW4gdHdvIHZhbHVlcywgZmVhdHVyaW5nIHNtb290aCBtaW5pbXVtLicsXG4gIHBhcmFtczoge1xuICAgIG1pbjogeyBuYW1lOiAnTWluJywgdHlwZTogJ2Zsb2F0JywgZGVmYXVsdDogMC4wIH0sXG4gICAgbWF4OiB7IG5hbWU6ICdNYXgnLCB0eXBlOiAnZmxvYXQnLCBkZWZhdWx0OiAxLjAgfSxcbiAgICBzbW9vdGg6IHsgbmFtZTogJ1Ntb290aCcsIHR5cGU6ICdmbG9hdCcsIGRlZmF1bHQ6IDAuMCwgbWluOiAwLjAgfVxuICB9LFxuICBmdW5jKCBjb250ZXh0ICkge1xuICAgIGlmICggY29udGV4dC5wYXJhbXMuc21vb3RoID09PSAwLjAgKSB7XG4gICAgICByZXR1cm4gcmF3Q2xhbXAoIGNvbnRleHQudmFsdWUsIGNvbnRleHQucGFyYW1zLm1pbiwgY29udGV4dC5wYXJhbXMubWF4ICk7XG4gICAgfVxuXG4gICAgY29uc3QgdiA9IC1zbWluKCAtY29udGV4dC5wYXJhbXMubWluLCAtY29udGV4dC52YWx1ZSwgY29udGV4dC5wYXJhbXMuc21vb3RoICk7XG4gICAgcmV0dXJuIHNtaW4oIGNvbnRleHQucGFyYW1zLm1heCwgdiwgY29udGV4dC5wYXJhbXMuc21vb3RoICk7XG4gIH1cbn07XG4iLCJpbXBvcnQgdHlwZSB7IEZ4RGVmaW5pdGlvbiB9IGZyb20gJ0BmbXMtY2F0L2F1dG9tYXRvbic7XG5cbmV4cG9ydCBjb25zdCBleHA6IEZ4RGVmaW5pdGlvbiA9IHtcbiAgbmFtZTogJ0V4cG9uZW50aWFsIFNtb290aGluZycsXG4gIGRlc2NyaXB0aW9uOiAnU21vb3RoIHRoZSBjdXJ2ZS4gU2ltcGxlIGJ1dCBnb29kLicsXG4gIHBhcmFtczoge1xuICAgIGZhY3RvcjogeyBuYW1lOiAnRmFjdG9yJywgdHlwZTogJ2Zsb2F0JywgZGVmYXVsdDogMTAuMCwgbWluOiAwLjAgfVxuICB9LFxuICBmdW5jKCBjb250ZXh0ICkge1xuICAgIGNvbnN0IHYgPSBjb250ZXh0LnZhbHVlO1xuXG4gICAgaWYgKCBjb250ZXh0LmluaXQgKSB7XG4gICAgICBjb250ZXh0LnN0YXRlLnBvcyA9IHY7XG4gICAgfVxuXG4gICAgY29uc3QgayA9IE1hdGguZXhwKCAtY29udGV4dC5kZWx0YVRpbWUgKiBjb250ZXh0LnBhcmFtcy5mYWN0b3IgKTtcbiAgICBjb250ZXh0LnN0YXRlLnBvcyA9IGNvbnRleHQuc3RhdGUucG9zICogayArIHYgKiAoIDEuMCAtIGsgKTtcbiAgICByZXR1cm4gY29udGV4dC5zdGF0ZS5wb3M7XG4gIH1cbn07XG4iLCJpbXBvcnQgdHlwZSB7IEZ4RGVmaW5pdGlvbiB9IGZyb20gJ0BmbXMtY2F0L2F1dG9tYXRvbic7XG5cbmV4cG9ydCBjb25zdCBncmF2aXR5OiBGeERlZmluaXRpb24gPSB7XG4gIG5hbWU6ICdHcmF2aXR5JyxcbiAgZGVzY3JpcHRpb246ICdBY2NlbGVyYXRlIGFuZCBib3VuY2UgdGhlIGN1cnZlLicsXG4gIHBhcmFtczoge1xuICAgIGE6IHsgbmFtZTogJ0FjY2VsZXJhdGlvbicsIHR5cGU6ICdmbG9hdCcsIGRlZmF1bHQ6IDkuOCB9LFxuICAgIGU6IHsgbmFtZTogJ1Jlc3RpdHV0aW9uJywgdHlwZTogJ2Zsb2F0JywgZGVmYXVsdDogMC41LCBtaW46IDAuMCB9LFxuICAgIHByZXNlcnZlOiB7IG5hbWU6ICdQcmVzZXJ2ZSBWZWxvY2l0eScsIHR5cGU6ICdib29sZWFuJywgZGVmYXVsdDogZmFsc2UgfVxuICB9LFxuICBmdW5jKCBjb250ZXh0ICkge1xuICAgIGNvbnN0IGR0ID0gY29udGV4dC5kZWx0YVRpbWU7XG4gICAgY29uc3QgdiA9IGNvbnRleHQudmFsdWU7XG5cbiAgICBpZiAoIGNvbnRleHQuaW5pdCApIHtcbiAgICAgIGNvbnRleHQuc3RhdGUucG9zID0gdjtcbiAgICAgIGlmICggY29udGV4dC5wYXJhbXMucHJlc2VydmUgKSB7XG4gICAgICAgIGNvbnN0IGR2ID0gdiAtIGNvbnRleHQuZ2V0VmFsdWUoIGNvbnRleHQudGltZSAtIGR0ICk7XG4gICAgICAgIGNvbnRleHQuc3RhdGUudmVsID0gZHYgLyBkdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRleHQuc3RhdGUudmVsID0gMC4wO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGEgPSBNYXRoLnNpZ24oIHYgLSBjb250ZXh0LnN0YXRlLnBvcyApICogY29udGV4dC5wYXJhbXMuYTtcbiAgICBjb250ZXh0LnN0YXRlLnZlbCArPSBhICogZHQ7XG4gICAgY29udGV4dC5zdGF0ZS5wb3MgKz0gY29udGV4dC5zdGF0ZS52ZWwgKiBkdDtcblxuICAgIGlmICggTWF0aC5zaWduKCBhICkgIT09IE1hdGguc2lnbiggdiAtIGNvbnRleHQuc3RhdGUucG9zICkgKSB7XG4gICAgICBjb250ZXh0LnN0YXRlLnZlbCAqPSAtY29udGV4dC5wYXJhbXMuZTtcbiAgICAgIGNvbnRleHQuc3RhdGUucG9zID0gdiArIGNvbnRleHQucGFyYW1zLmUgKiAoIHYgLSBjb250ZXh0LnN0YXRlLnBvcyApO1xuICAgIH1cblxuICAgIHJldHVybiBjb250ZXh0LnN0YXRlLnBvcztcbiAgfVxufTtcbiIsImltcG9ydCB0eXBlIHsgRnhEZWZpbml0aW9uIH0gZnJvbSAnQGZtcy1jYXQvYXV0b21hdG9uJztcblxuZXhwb3J0IGNvbnN0IGhlcm1pdGVQYXRjaDogRnhEZWZpbml0aW9uID0ge1xuICBuYW1lOiAnSGVybWl0ZSBQYXRjaCcsXG4gIGRlc2NyaXB0aW9uOiAnUGF0Y2ggYSBjdXJ2ZSB1c2luZyBoZXJtaXRlIHNwbGluZS4nLFxuICBwYXJhbXM6IHt9LFxuICBmdW5jKCBjb250ZXh0ICkge1xuICAgIGlmICggY29udGV4dC5pbml0ICkge1xuICAgICAgY29uc3QgZHQgPSBjb250ZXh0LmRlbHRhVGltZTtcblxuICAgICAgY29uc3QgdjAgPSBjb250ZXh0LmdldFZhbHVlKCBjb250ZXh0LnQwICk7XG4gICAgICBjb25zdCBkdjAgPSB2MCAtIGNvbnRleHQuZ2V0VmFsdWUoIGNvbnRleHQudDAgLSBkdCApO1xuICAgICAgY29uc3QgdjEgPSBjb250ZXh0LmdldFZhbHVlKCBjb250ZXh0LnQxICk7XG4gICAgICBjb25zdCBkdjEgPSB2MSAtIGNvbnRleHQuZ2V0VmFsdWUoIGNvbnRleHQudDEgLSBkdCApO1xuXG4gICAgICBjb250ZXh0LnN0YXRlLnAwID0gdjA7XG4gICAgICBjb250ZXh0LnN0YXRlLm0wID0gZHYwIC8gZHQgKiBjb250ZXh0Lmxlbmd0aDtcbiAgICAgIGNvbnRleHQuc3RhdGUucDEgPSB2MTtcbiAgICAgIGNvbnRleHQuc3RhdGUubTEgPSBkdjEgLyBkdCAqIGNvbnRleHQubGVuZ3RoO1xuICAgIH1cblxuICAgIGNvbnN0IHsgcDAsIG0wLCBwMSwgbTEgfSA9IGNvbnRleHQuc3RhdGU7XG4gICAgY29uc3QgdCA9IGNvbnRleHQucHJvZ3Jlc3M7XG5cbiAgICByZXR1cm4gKFxuICAgICAgKCAoIDIuMCAqIHQgLSAzLjAgKSAqIHQgKiB0ICsgMS4wICkgKiBwMCArXG4gICAgICAoICggKCB0IC0gMi4wICkgKiB0ICsgMS4wICkgKiB0ICkgKiBtMCArXG4gICAgICAoICggLTIuMCAqIHQgKyAzLjAgKSAqIHQgKiB0ICkgKiBwMSArXG4gICAgICAoICggdCAtIDEuMCApICogdCAqIHQgKSAqIG0xXG4gICAgKTtcbiAgfVxufTtcbiIsImltcG9ydCB0eXBlIHsgRnhEZWZpbml0aW9uIH0gZnJvbSAnQGZtcy1jYXQvYXV0b21hdG9uJztcblxuZXhwb3J0IGNvbnN0IGxvZmk6IEZ4RGVmaW5pdGlvbiA9IHtcbiAgbmFtZTogJ0xvLUZpJyxcbiAgZGVzY3JpcHRpb246ICdNYWtlIGN1cnZlIG1vcmUgY3J1bmNoeS4nLFxuICBwYXJhbXM6IHtcbiAgICByYXRlOiB7IG5hbWU6ICdGcmFtZSBSYXRlJywgdHlwZTogJ2Zsb2F0JywgZGVmYXVsdDogMTAuMCwgbWluOiAwLjAsIG1heDogMTAwMC4wIH0sXG4gICAgcmVsYXRpdmU6IHsgbmFtZTogJ1JlbGF0aXZlJywgdHlwZTogJ2Jvb2xlYW4nLCBkZWZhdWx0OiBmYWxzZSB9LFxuICAgIHJlc286IHsgbmFtZTogJ1Jlc28gUGVyIFVuaXQnLCB0eXBlOiAnZmxvYXQnLCBkZWZhdWx0OiAwLjEsIG1pbjogMC4wLCBtYXg6IDEwMDAuMCB9LFxuICAgIHJvdW5kOiB7IG5hbWU6ICdSb3VuZCcsIHR5cGU6ICdib29sZWFuJywgZGVmYXVsdDogZmFsc2UgfVxuICB9LFxuICBmdW5jKCBjb250ZXh0ICkge1xuICAgIGxldCB0O1xuICAgIGlmICggY29udGV4dC5wYXJhbXMucmF0ZSA9PT0gMC4wICkge1xuICAgICAgdCA9IGNvbnRleHQudGltZTtcbiAgICB9IGVsc2UgaWYgKCBjb250ZXh0LnBhcmFtcy5yZWxhdGl2ZSApIHtcbiAgICAgIHQgPSBjb250ZXh0LnQwICsgTWF0aC5mbG9vcihcbiAgICAgICAgKCBjb250ZXh0LnRpbWUgLSBjb250ZXh0LnQwICkgKiBjb250ZXh0LnBhcmFtcy5yYXRlXG4gICAgICApIC8gY29udGV4dC5wYXJhbXMucmF0ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdCA9IE1hdGguZmxvb3IoICggY29udGV4dC50aW1lICkgKiBjb250ZXh0LnBhcmFtcy5yYXRlICkgLyBjb250ZXh0LnBhcmFtcy5yYXRlO1xuICAgIH1cblxuICAgIGxldCB2ID0gY29udGV4dC5nZXRWYWx1ZSggdCApO1xuICAgIGlmICggY29udGV4dC5wYXJhbXMucmVzbyAhPT0gMC4wICkge1xuICAgICAgdiA9IE1hdGguZmxvb3IoXG4gICAgICAgIHYgKiBjb250ZXh0LnBhcmFtcy5yZXNvICsgKCBjb250ZXh0LnBhcmFtcy5yb3VuZCA/IDAuNSA6IDAuMCApXG4gICAgICApIC8gY29udGV4dC5wYXJhbXMucmVzbztcbiAgICB9XG4gICAgcmV0dXJuIHY7XG4gIH1cbn07XG4iLCJleHBvcnQgZnVuY3Rpb24gc21vb3Roc3RlcCggYTogbnVtYmVyLCBiOiBudW1iZXIsIGs6IG51bWJlciApOiBudW1iZXIge1xuICBjb25zdCBzbW9vdGggPSBrICogayAqICggMy4wIC0gMi4wICogayApO1xuICByZXR1cm4gYSArICggYiAtIGEgKSAqIHNtb290aDtcbn1cbiIsImV4cG9ydCBjbGFzcyBYb3JzaGlmdCB7XG4gIHByaXZhdGUgX19zZWVkOiBudW1iZXIgPSAxO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvciggc2VlZD86IG51bWJlciApIHtcbiAgICB0aGlzLnNldCggc2VlZCApO1xuICB9XG5cbiAgcHVibGljIGdlbiggc2VlZD86IG51bWJlciApOiBudW1iZXIge1xuICAgIGlmICggc2VlZCApIHsgdGhpcy5zZXQoIHNlZWQgKTsgfVxuICAgIHRoaXMuX19zZWVkID0gdGhpcy5fX3NlZWQgXiAoIHRoaXMuX19zZWVkIDw8IDEzICk7XG4gICAgdGhpcy5fX3NlZWQgPSB0aGlzLl9fc2VlZCBeICggdGhpcy5fX3NlZWQgPj4+IDE3ICk7XG4gICAgdGhpcy5fX3NlZWQgPSB0aGlzLl9fc2VlZCBeICggdGhpcy5fX3NlZWQgPDwgNSApO1xuICAgIHJldHVybiB0aGlzLl9fc2VlZCAvIE1hdGgucG93KCAyLCAzMiApICsgMC41O1xuICB9XG5cbiAgcHVibGljIHNldCggc2VlZDogbnVtYmVyID0gMSApOiB2b2lkIHtcbiAgICB0aGlzLl9fc2VlZCA9IHNlZWQ7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgWG9yc2hpZnQ7XG4iLCJpbXBvcnQgeyBzbW9vdGhzdGVwIH0gZnJvbSAnLi91dGlscy9zbW9vdGhzdGVwJztcbmltcG9ydCBYb3JzaGlmdCBmcm9tICcuL3V0aWxzL3hvcnNoaWZ0JztcbmltcG9ydCB0eXBlIHsgRnhEZWZpbml0aW9uIH0gZnJvbSAnQGZtcy1jYXQvYXV0b21hdG9uJztcblxuY29uc3QgeG9yc2hpZnQgPSBuZXcgWG9yc2hpZnQoKTtcblxuZXhwb3J0IGNvbnN0IG5vaXNlOiBGeERlZmluaXRpb24gPSB7XG4gIG5hbWU6ICdGcmFjdGFsIE5vaXNlJyxcbiAgZGVzY3JpcHRpb246ICd3aWdnbGUoKScsXG4gIHBhcmFtczoge1xuICAgIHJlY3Vyc2lvbjogeyBuYW1lOiAnUmVjdXJzaW9uJywgdHlwZTogJ2ludCcsIGRlZmF1bHQ6IDQsIG1pbjogMSwgbWF4OiA5OSB9LFxuICAgIGZyZXE6IHsgbmFtZTogJ0ZyZXF1ZW5jeScsIHR5cGU6ICdmbG9hdCcsIGRlZmF1bHQ6IDEuMCwgbWluOiAwLjAgfSxcbiAgICByZXNvOiB7IG5hbWU6ICdSZXNvbHV0aW9uJywgdHlwZTogJ2Zsb2F0JywgZGVmYXVsdDogOC4wLCBtaW46IDEuMCB9LFxuICAgIHNlZWQ6IHsgbmFtZTogJ1NlZWQnLCB0eXBlOiAnaW50JywgZGVmYXVsdDogMSwgbWluOiAwIH0sXG4gICAgYW1wOiB7IG5hbWU6ICdBbXAnLCB0eXBlOiAnZmxvYXQnLCBkZWZhdWx0OiAwLjIgfVxuICB9LFxuICBmdW5jKCBjb250ZXh0ICkge1xuICAgIGlmICggY29udGV4dC5pbml0ICkge1xuICAgICAgeG9yc2hpZnQuZ2VuKCBjb250ZXh0LnBhcmFtcy5zZWVkICk7XG5cbiAgICAgIGNvbnRleHQuc3RhdGUudGFibGUgPSBuZXcgRmxvYXQzMkFycmF5KCBNYXRoLmZsb29yKCBjb250ZXh0LnBhcmFtcy5yZXNvICkgKyAyICk7XG4gICAgICBmb3IgKCBsZXQgaSA9IDE7IGkgPCBjb250ZXh0LnBhcmFtcy5yZXNvOyBpICsrICkge1xuICAgICAgICBjb250ZXh0LnN0YXRlLnRhYmxlWyBpIF0gPSB4b3JzaGlmdC5nZW4oKSAqIDIuMCAtIDEuMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgdiA9IGNvbnRleHQudmFsdWU7XG4gICAgY29uc3QgcCA9IGNvbnRleHQucHJvZ3Jlc3M7XG5cbiAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBjb250ZXh0LnBhcmFtcy5yZWN1cnNpb247IGkgKysgKSB7XG4gICAgICBjb25zdCBpbmRleCA9IChcbiAgICAgICAgcCAqIGNvbnRleHQucGFyYW1zLmZyZXEgKiBjb250ZXh0LnBhcmFtcy5yZXNvICogTWF0aC5wb3coIDIuMCwgaSApXG4gICAgICApICUgY29udGV4dC5wYXJhbXMucmVzbztcbiAgICAgIGNvbnN0IGluZGV4aSA9IE1hdGguZmxvb3IoIGluZGV4ICk7XG4gICAgICBjb25zdCBpbmRleGYgPSBpbmRleCAtIGluZGV4aTtcbiAgICAgIGNvbnN0IGZhY3RvciA9IE1hdGgucG93KCAwLjUsIGkgKyAxLjAgKTtcblxuICAgICAgdiArPSBjb250ZXh0LnBhcmFtcy5hbXAgKiBmYWN0b3IgKiBzbW9vdGhzdGVwKFxuICAgICAgICBjb250ZXh0LnN0YXRlLnRhYmxlWyBpbmRleGkgXSxcbiAgICAgICAgY29udGV4dC5zdGF0ZS50YWJsZVsgaW5kZXhpICsgMSBdLFxuICAgICAgICBpbmRleGZcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB2O1xuICB9XG59O1xuIiwiaW1wb3J0IHR5cGUgeyBGeERlZmluaXRpb24gfSBmcm9tICdAZm1zLWNhdC9hdXRvbWF0b24nO1xuXG5leHBvcnQgY29uc3QgcG93OiBGeERlZmluaXRpb24gPSB7XG4gIG5hbWU6ICdQb3dlcicsXG4gIGRlc2NyaXB0aW9uOiAnWW91IGdvdCBib29zdCBwb3dlciEnLFxuICBwYXJhbXM6IHtcbiAgICBwb3c6IHsgbmFtZTogJ1Bvd2VyJywgdHlwZTogJ2Zsb2F0JywgZGVmYXVsdDogMi4wIH0sXG4gICAgYmlhczogeyBuYW1lOiAnQmlhcycsIHR5cGU6ICdmbG9hdCcsIGRlZmF1bHQ6IDAuMCB9LFxuICAgIHBvc2l0aXZlOiB7IG5hbWU6ICdGb3JjZSBQb3NpdGl2ZScsIHR5cGU6ICdib29sZWFuJywgZGVmYXVsdDogZmFsc2UgfVxuICB9LFxuICBmdW5jKCBjb250ZXh0ICkge1xuICAgIGNvbnN0IHYgPSBjb250ZXh0LnZhbHVlIC0gY29udGV4dC5wYXJhbXMuYmlhcztcbiAgICBjb25zdCBzaWduID0gY29udGV4dC5wYXJhbXMucG9zaXRpdmUgPyAxLjAgOiBNYXRoLnNpZ24oIHYgKTtcbiAgICByZXR1cm4gTWF0aC5wb3coXG4gICAgICBNYXRoLmFicyggdiApLFxuICAgICAgY29udGV4dC5wYXJhbXMucG93XG4gICAgKSAqIHNpZ24gKyBjb250ZXh0LnBhcmFtcy5iaWFzO1xuICB9XG59O1xuIiwiaW1wb3J0IHR5cGUgeyBGeERlZmluaXRpb24gfSBmcm9tICdAZm1zLWNhdC9hdXRvbWF0b24nO1xuXG5leHBvcnQgY29uc3QgcmVwZWF0OiBGeERlZmluaXRpb24gPSB7XG4gIG5hbWU6ICdSZXBlYXQnLFxuICBkZXNjcmlwdGlvbjogJ1JlcGVhdCBhIHNlY3Rpb24gb2YgdGhlIGN1cnZlLicsXG4gIHBhcmFtczoge1xuICAgIGludGVydmFsOiB7IG5hbWU6ICdJbnRlcnZhbCcsIHR5cGU6ICdmbG9hdCcsIGRlZmF1bHQ6IDEuMCwgbWluOiAwLjAgfSxcbiAgfSxcbiAgZnVuYyggY29udGV4dCApIHtcbiAgICByZXR1cm4gY29udGV4dC5nZXRWYWx1ZSggY29udGV4dC50MCArIGNvbnRleHQuZWxhcHNlZCAlIGNvbnRleHQucGFyYW1zLmludGVydmFsICk7XG4gIH1cbn07XG4iLCJpbXBvcnQgdHlwZSB7IEZ4RGVmaW5pdGlvbiB9IGZyb20gJ0BmbXMtY2F0L2F1dG9tYXRvbic7XG5cbmNvbnN0IFRBVSA9IE1hdGguUEkgKiAyLjA7XG5cbmV4cG9ydCBjb25zdCBzaW5lOiBGeERlZmluaXRpb24gPSB7XG4gIG5hbWU6ICdTaW5ld2F2ZScsXG4gIGRlc2NyaXB0aW9uOiAnT3ZlcmxheSBhIHNpbmV3YXZlIHRvIHRoZSBjdXJ2ZS4nLFxuICBwYXJhbXM6IHtcbiAgICBhbXA6IHsgbmFtZTogJ0FtcCcsIHR5cGU6ICdmbG9hdCcsIGRlZmF1bHQ6IDAuMSB9LFxuICAgIGZyZXE6IHsgbmFtZTogJ0ZyZXF1ZW5jeScsIHR5cGU6ICdmbG9hdCcsIGRlZmF1bHQ6IDUuMCB9LFxuICAgIHBoYXNlOiB7IG5hbWU6ICdQaGFzZScsIHR5cGU6ICdmbG9hdCcsIGRlZmF1bHQ6IDAuMCwgbWluOiAwLjAsIG1heDogMS4wIH1cbiAgfSxcbiAgZnVuYyggY29udGV4dCApIHtcbiAgICBjb25zdCB2ID0gY29udGV4dC52YWx1ZTtcbiAgICBjb25zdCBwID0gY29udGV4dC5wcm9ncmVzcyAqIGNvbnRleHQucGFyYW1zLmZyZXEgKyBjb250ZXh0LnBhcmFtcy5waGFzZTtcbiAgICByZXR1cm4gdiArIGNvbnRleHQucGFyYW1zLmFtcCAqIE1hdGguc2luKCBwICogVEFVICk7XG4gIH1cbn07XG4iXSwibmFtZXMiOlsiY2xhbXAiLCJyYXdDbGFtcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7TUFFYSxHQUFHLEdBQWlCO0lBQy9CLElBQUksRUFBRSxLQUFLO0lBQ1gsV0FBVyxFQUFFLCtEQUEr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
