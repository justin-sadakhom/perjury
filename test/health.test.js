import { Health } from '../src/modules/classes/health.js'

test("Constructor with positive parameter initializes fields correctly", () => {
    let health = new Health(5)
    expect(health.current).toBe(5)
    expect(health.max).toBe(5)
})

test("Constructor with non-positive parameter throws RangeError", () => {
    let health
    expect(() => {health = new Health(0)}).toThrow(RangeError)
})

test("Health.deduct() properly decrements current", () => {
    let health = new Health(5)
    health.deduct(1)
    expect(health.current).toBe(4)
})

test("Health.deduct() doesn't decrement current below 0", () => {
    let health = new Health(5)
    health.deduct(6)
    expect(health.current).toBe(0)
})

test("Health.add() properly increments current", () => {
    let health = new Health(5)
    health.deduct(2)
    health.add(1)
    expect(health.current).toBe(4)
})

test("Health.add() doesn't increment current above max", () => {
    let health = new Health(5)
    health.add(1)
    expect(health.current).toBe(5)
})