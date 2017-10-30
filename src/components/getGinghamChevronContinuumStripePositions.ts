import {
	Address,
	constants,
	from,
	getFromBaseOrDefaultPattern,
	GetStripePositions,
	StripeCountContinuumSettings,
	StripePosition,
	to,
} from '../../../../src'
import { termialRoot } from '../../../../src/utilities/mathUtilities'
import { getDistanceFromHomeAddress } from './getDistanceFromHomeAddress'
import { neededStripeCountToCoverGrid } from './neededStripeCountToCoverGrid'
import { GetStripePositionsParams } from './types'

const getGinghamChevronContinuumStripePositions: GetStripePositions =
	({ gridAddress }: { gridAddress: Address }): StripePosition[] => {
		const {
			initialStripeCount,
			deltaStripeCount,
		}: StripeCountContinuumSettings = getFromBaseOrDefaultPattern('stripeCountContinuumSettings')

		const distanceFromHomeAddress: number = getDistanceFromHomeAddress({ gridAddress })

		return getStripePositions({ initialStripeCount, distanceFromHomeAddress, deltaStripeCount })
	}

const getStripePositions: (_: GetStripePositionsParams) => StripePosition[] =
	({ deltaStripeCount, distanceFromHomeAddress, initialStripeCount }: GetStripePositionsParams): StripePosition[] => {
		const stripePositions: StripePosition[] = to.StripePositions([ 0 ])

		for (let n: number = 0; n < neededStripeCountToCoverGrid(); n++) {
			const rawStripePositionValue: number = termialRoot({
				n,
				rangeDelta: deltaStripeCount,
				rangeStart: initialStripeCount,
			}) * from.StripePosition(constants.PERIMETER_SCALAR)

			if (rawStripePositionValue >= distanceFromHomeAddress + from.StripePosition(constants.PERIMETER_SCALAR)) {
				return stripePositions
			}
			if (rawStripePositionValue > distanceFromHomeAddress) {
				const positionWithinTile: number = rawStripePositionValue - distanceFromHomeAddress
				const stripePositionValue: number = positionWithinTile % from.StripePosition(constants.PERIMETER_SCALAR)
				stripePositions.push(to.StripePosition(stripePositionValue))
			}
		}

		return stripePositions
	}

export { getGinghamChevronContinuumStripePositions }
