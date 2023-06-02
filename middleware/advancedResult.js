const advancedResults = (model, populate, status) => async (req, res, next) => {
	let query

	// Copy req.query
	const reqQuery = { ...req.query }

	// Fields to exclude
	const removeFields = ["select", "sort", "page", "limit", "search"]

	// Loop over removeFields and delete them from reqQuery
	removeFields.forEach((param) => delete reqQuery[param])

	// Create query string
	let queryStr = JSON.stringify(reqQuery)

	// Create operators ($gt, $gte, etc)
	queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)

	if (req.query.search) {
		queryStr = {
			$or: [
				{ firstName: { $regex: req.query.search, $options: "i" } },
				{ lastName: { $regex: req.query.search, $options: "i" } },
			],
		}
	}

	let filter = req.query.search ? queryStr : JSON.parse(queryStr)

	if (status) {
		filter = { filter, status }
	}

	// Finding resource
	query = model.find(filter)

	// Select Fields
	if (req.query.select) {
		const fields = req.query.select.split(",").join(" ")
		query = query.select(fields)
	}

	// Sort
	if (req.query.sort) {
		const sortBy = req.query.sort.split(",").join(" ")
		query = query.sort(sortBy)
	} else {
		query = query.sort("-createdAt")
	}

	// Pagination
	const page = parseInt(req.query.page, 10) || 1
	const limit = parseInt(req.query.limit, 10) || 25
	const startIndex = (page - 1) * limit
	const endIndex = page * limit
	const total = await model.countDocuments()

	query = query.skip(startIndex).limit(limit)

	// Populate the model
	if (populate) {
		query = query.populate(populate)
	}
	// Executing query
	const results = await query

	// Pagination result
	const pagination = {}

	if (endIndex < total) {
		pagination.next = {
			page: page + 1,
			limit,
		}
	}

	if (startIndex > 0) {
		pagination.prev = {
			page: page - 1,
			limit,
		}
	}

	res.advancedResults = {
		totalCount: total,
		count: results.length,
		pagination,
		data: results,
	}

	next()
}

export default advancedResults
