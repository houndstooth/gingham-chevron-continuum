import inverseTriangularNumber from '../utilities/inverseTriangularNumber'
import layer from '../components/layer'
import iterator from '../../shared/utilities/iterator'
import triangularNumber from '../utilities/triangularNumber'
import { GRID_SIZE } from '../../shared/common/customize'
import { THINNING_RATE } from '../common/customize'

const NEEDED_STRIPE_COUNT = triangularNumber(GRID_SIZE + 1)

export default () => {
	const stripes = iterator(NEEDED_STRIPE_COUNT).map(n => inverseTriangularNumber(n) / THINNING_RATE)

	let countOfSquaresInThisLayer = 0

	// start out with just the top left corner
	let thisDiagonalsStripeEdgeModuli = [ 0 ]

	// clearly each next diagonal has 2 more squares than the previous one,
	// but what does this have to do with the cut-off in drawing a new layer,
	// or the modulus?
	stripes.forEach(stripe => {
		if (stripe >= countOfSquaresInThisLayer + 2) {
			layer({ thisDiagonalsStripeEdgeModuli, countOfSquaresInThisLayer })
			thisDiagonalsStripeEdgeModuli = [ 0 ]
			countOfSquaresInThisLayer += 2
		}

		thisDiagonalsStripeEdgeModuli.push(stripe % 2)
	})
}