import mathUtilities from '../../../../src/utilities/mathUtilities'
import store from '../../../../store'

export default () => {
	const { stripeSettings, gridSettings } = store.mainHoundstooth.basePattern
	const { initialStripeCount, deltaStripeCount } = stripeSettings.stripePositionSettings.ginghamChevronContinuumSettings
	return initialStripeCount + deltaStripeCount * mathUtilities.triangularNumber(gridSettings.gridSize)
}
