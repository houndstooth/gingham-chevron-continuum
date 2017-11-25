import { Address, composeMainHoundstooth, ShapeColorIndex, to } from '../../../../../src'
// tslint:disable-next-line:max-line-length
import {
	indexOfFirstStripeCrossingThisTile,
	realignShapeColorIndicesForGinghamChevronContinuum,
} from '../../../pattern'

// tslint:disable-next-line:max-line-length
describe('realign tile color indices to maintain gingham chevron continuum across grid, because the information about alternation of the colorSet has been lost from individual tiles, we have to check the modulus of the overall grid stripes instead', () => {
	const shapeColorIndices: ShapeColorIndex[] = to.ShapeColorIndices([ 9, 88 ])
	const gridAddress: Address = to.Address([ 4, 7 ])
	beforeEach(() => {
		composeMainHoundstooth.main({
			houndstoothEffects: [],
			houndstoothOverrides: {
				basePattern: {
					stripeSettings: {
						stripePositionSettings: {
							stripeCountContinuumSettings: {
								deltaStripeCount: 67,
								initialStripeCount: 400,
							},
						},
					},
				},
			},
		})
	})

	describe('when the index of the first grid stripe crossing this tile is even', () => {
		it('returns the set for tile as is; all is well', () => {
			spyOn(indexOfFirstStripeCrossingThisTile, 'main').and.returnValue(2)
			const actual: ShapeColorIndex[] = realignShapeColorIndicesForGinghamChevronContinuum.main({
				gridAddress,
				shapeColorIndices,
			})
			expect(actual).toEqual(to.ShapeColorIndices([ 9, 88 ]))
		})
	})

	describe('when the index of the first grid stripe crossing this tile is odd', () => {
		it('reverses the set to flip the grain, to realign with previous diagonal row of striped tiles', () => {
			spyOn(indexOfFirstStripeCrossingThisTile, 'main').and.returnValue(1)
			const actual: ShapeColorIndex[] = realignShapeColorIndicesForGinghamChevronContinuum.main({
				gridAddress,
				shapeColorIndices,
			})
			expect(actual).toEqual(to.ShapeColorIndices([ 88, 9 ]))
		})
	})
})