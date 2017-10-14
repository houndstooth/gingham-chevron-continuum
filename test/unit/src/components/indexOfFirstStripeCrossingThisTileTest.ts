import indexOfFirstStripeCrossingThisTile from '../../../../src/components/indexOfFirstStripeCrossingThisTile'
import composeMainHoundstooth from '../../../../../../src/execute/composeMainHoundstooth'

describe('index of first grid stripe crossing this tile', () => {
	it('an example', () => {
		composeMainHoundstooth({
			houndstoothEffects: [],
			houndstoothOverrides: {
				basePattern: {
					stripeSettings: {
						stripePositionSettings: {
							stripeCountContinuumSettings: {
								initialStripeCount: 1,
								deltaStripeCount: 1,
							},
						},
					},
				},
			},
		})

		expect(indexOfFirstStripeCrossingThisTile({ gridAddress: [ 1, 5 ] })).toBe(1 + 2 + 3 + 1)
	})

	it('another example', () => {
		composeMainHoundstooth({
			houndstoothEffects: [],
			houndstoothOverrides: {
				basePattern: {
					stripeSettings: {
						stripePositionSettings: {
							stripeCountContinuumSettings: {
								initialStripeCount: 4,
								deltaStripeCount: 7,
							},
						},
					},
				},
			},
		})

		expect(indexOfFirstStripeCrossingThisTile({ gridAddress: [ 1, 5 ] })).toBe(4 + (4 + 7) + (4 + 7 + 7) + 1)
	})
})