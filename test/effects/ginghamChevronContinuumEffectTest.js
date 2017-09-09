import executeSelectedHoundstoothEffects from '../../../../src/execute/executeSelectedHoundstoothEffects'
import tileSectorCenterIsColor from '../../../../test/integration/helpers/tileSectorCenterIsColor'
import activateTestMarkerCanvas from '../../../../test/integration/helpers/activateTestMarkerCanvas'
import { BLACK, TRANSPARENT } from '../../../../src/constants'
import ginghamChevronContinuumEffect from '../../effects/ginghamChevronContinuumEffect'
import getFromBasePatternOrDefault from '../../../../test/helpers/getFromBasePatternOrDefault'
import settingsPaths from '../../../../test/helpers/settingsPaths'
import thisFrameOnly from '../../../../test/integration/helpers/thisFrameOnly'
import store from '../../../../store'
import resetStore from '../../../../src/store/resetStore'
import codeUtilities from '../../../../src/utilities/codeUtilities'

describe('gingham chevron continuum effect', () => {
	it('each new diagonal row has an extra stripe', () => {
		const tileSizeInPixels = getFromBasePatternOrDefault(settingsPaths.TILE_SIZE)
		store.selectedHoundstoothEffects = [ ginghamChevronContinuumEffect ]
		activateTestMarkerCanvas()

		executeSelectedHoundstoothEffects()

		expect(tileSectorCenterIsColor({
			id: 1,
			originInPixels: [ 0 * tileSizeInPixels, 0 * tileSizeInPixels ],
			tileSizeInPixels,
			x: 0,
			y: 0,
			n: 1,
			color: BLACK,
		})).toBe(true)

		expect(tileSectorCenterIsColor({
			id: 1,
			originInPixels: [ 1 * tileSizeInPixels, 1 * tileSizeInPixels ],
			tileSizeInPixels,
			x: 0,
			y: 0,
			n: 2,
			color: BLACK,
		})).toBe(true)
		expect(tileSectorCenterIsColor({
			id: 1,
			originInPixels: [ 1 * tileSizeInPixels, 1 * tileSizeInPixels ],
			tileSizeInPixels,
			x: 1,
			y: 1,
			n: 2,
			color: TRANSPARENT,
		})).toBe(true)

		expect(tileSectorCenterIsColor({
			id: 1,
			originInPixels: [ 2 * tileSizeInPixels, 2 * tileSizeInPixels ],
			tileSizeInPixels,
			x: 0,
			y: 0,
			n: 3,
			color: TRANSPARENT,
		})).toBe(true)
		expect(tileSectorCenterIsColor({
			id: 1,
			originInPixels: [ 2 * tileSizeInPixels, 2 * tileSizeInPixels ],
			tileSizeInPixels,
			x: 1,
			y: 1,
			n: 3,
			color: BLACK,
		})).toBe(true)
		expect(tileSectorCenterIsColor({
			id: 1,
			originInPixels: [ 2 * tileSizeInPixels, 2 * tileSizeInPixels ],
			tileSizeInPixels,
			x: 2,
			y: 2,
			n: 3,
			color: TRANSPARENT,
		})).toBe(true)

		expect(tileSectorCenterIsColor({
			id: 1,
			originInPixels: [ 3 * tileSizeInPixels, 3 * tileSizeInPixels ],
			tileSizeInPixels,
			x: 0,
			y: 0,
			n: 4,
			color: TRANSPARENT,
		})).toBe(true)
		expect(tileSectorCenterIsColor({
			id: 1,
			originInPixels: [ 3 * tileSizeInPixels, 3 * tileSizeInPixels ],
			tileSizeInPixels,
			x: 1,
			y: 1,
			n: 4,
			color: BLACK,
		})).toBe(true)
		expect(tileSectorCenterIsColor({
			id: 1,
			originInPixels: [ 3 * tileSizeInPixels, 3 * tileSizeInPixels ],
			tileSizeInPixels,
			x: 2,
			y: 2,
			n: 4,
			color: TRANSPARENT,
		})).toBe(true)
		expect(tileSectorCenterIsColor({
			id: 1,
			originInPixels: [ 3 * tileSizeInPixels, 3 * tileSizeInPixels ],
			tileSizeInPixels,
			x: 3,
			y: 3,
			n: 4,
			color: BLACK,
		})).toBe(true)
	})

	describe('animating', () => {
		const ginghamChevronContinuumAnimationTestHoundstoothOverrides = {
			basePattern: {
				gridSettings: { gridSize: 4 },
				viewSettings: { canvasSize: 200 },
				tileSettings: { tileSizeSetting: 50 },
			},
		}

		let thisAnimationFrameOnly
		beforeEach(() => {
			resetStore(store)
			const animatorSpy = jasmine.createSpy().and.callFake(({ animationFunction, stopCondition }) => {
				while (!stopCondition()) animationFunction()
			})
			executeSelectedHoundstoothEffects.__Rewire__('animator', animatorSpy)
			thisAnimationFrameOnly = thisFrameOnly.thisAnimationFrameOnly
		})

		it('frame 0 looks just like the normal pattern', () => {
			const houndstoothOverrides = codeUtilities.deepClone(ginghamChevronContinuumAnimationTestHoundstoothOverrides)
			houndstoothOverrides.basePattern.animationSettings = thisAnimationFrameOnly(0)
			store.selectedHoundstoothEffects = [ ginghamChevronContinuumEffect ]
			activateTestMarkerCanvas()
			store.animating = true

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			expectStripedTile({ coordinate: 0, stripeCount: 1, firstColor: BLACK })
			expectStripedTile({ coordinate: 1, stripeCount: 2, firstColor: BLACK })
			expectStripedTile({ coordinate: 2, stripeCount: 3, firstColor: TRANSPARENT })
			expectStripedTile({ coordinate: 3, stripeCount: 4, firstColor: TRANSPARENT })
		})

		it('around frame 525 each tile has twice its original stripe count', () => {
			const houndstoothOverrides = codeUtilities.deepClone(ginghamChevronContinuumAnimationTestHoundstoothOverrides)
			houndstoothOverrides.basePattern.animationSettings = thisAnimationFrameOnly(525)
			store.selectedHoundstoothEffects = [ ginghamChevronContinuumEffect ]
			activateTestMarkerCanvas()
			store.animating = true

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			expectStripedTile({ coordinate: 0, stripeCount: 2, firstColor: BLACK })
			expectStripedTile({ coordinate: 1, stripeCount: 4, firstColor: TRANSPARENT })
			expectStripedTile({ coordinate: 2, stripeCount: 6, firstColor: BLACK })
			expectStripedTile({ coordinate: 3, stripeCount: 8, firstColor: TRANSPARENT })
		})

		it('around frame 666 each tile has thrice its original stripe count', () => {
			const houndstoothOverrides = codeUtilities.deepClone(ginghamChevronContinuumAnimationTestHoundstoothOverrides)
			houndstoothOverrides.basePattern.animationSettings = thisAnimationFrameOnly(666)
			store.selectedHoundstoothEffects = [ ginghamChevronContinuumEffect ]
			activateTestMarkerCanvas()
			store.animating = true

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			expectStripedTile({ coordinate: 0, stripeCount: 3, firstColor: BLACK })
			expectStripedTile({ coordinate: 1, stripeCount: 6, firstColor: BLACK })
			expectStripedTile({ coordinate: 2, stripeCount: 9, firstColor: TRANSPARENT })
			expectStripedTile({ coordinate: 3, stripeCount: 12, firstColor: TRANSPARENT })
		})
	})
})

const expectStripedTile = ({ coordinate, stripeCount, firstColor }) => {
	const tileSizeInPixels = getFromBasePatternOrDefault(settingsPaths.TILE_SIZE)
	codeUtilities.iterator(stripeCount).forEach(stripe => {
		expect(tileSectorCenterIsColor({
			id: 1,
			originInPixels: [ coordinate * tileSizeInPixels, coordinate * tileSizeInPixels ],
			tileSizeInPixels,
			x: stripe,
			y: stripe,
			n: stripeCount,
			color: stripe % 2 === 0 ? firstColor : firstColor === BLACK ? TRANSPARENT : BLACK,
		})).toBe(true)
	})
}
