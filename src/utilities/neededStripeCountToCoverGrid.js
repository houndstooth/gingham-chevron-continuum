import mathUtilities from '../../../../src/utilities/mathUtilities'

export default () => {
	const { stripeCountSettings, gridSettings } = currentState.builtPattern.base
	const { initialStripeCount, deltaStripeCount } = stripeCountSettings.ginghamChevronContinuum
	return initialStripeCount + deltaStripeCount * mathUtilities.triangularNumber(gridSettings.gridSize)
}
