import book_data from './../../../shared/books/books.json';

interface BookJSONPublishDate {
	$date: string;
}

interface BookJSON {
	title: string;
	isbn?: string;
	pageCount: number;
	publishedDate?: BookJSONPublishDate;
	thumbnailUrl?: string;
	shortDescription?: string;
	longDescription?: string;
	status: string;
	authors: string[];
	categories: string[];
}

interface BookIndexed {
	title: string;
	isbn?: string;
	pageCount: number;
	publishedDate?: BookJSONPublishDate;
	thumbnailUrl?: string;
	shortDescription?: string;
	longDescription?: string;
	status: string;
	authors: string[];
	categories: number[];
}

interface BookClassification {
	[key: string]: string;
}

interface BookClassificationNew {
	index: number;
	name: string;
}

interface BookClassificationCountNew extends BookClassificationNew {
	count: number;
}

function insertIfNotDefined(classification: BookClassification, element: string) {
	const values = Object.values(classification);
	if (!values.includes(element)) {
		classification[values.length + 1] = element;
	}
}

function normaliseBookData(books: BookJSON[]) {
	const status: BookClassification = {};
	const authors: BookClassification = {};
	const categories: BookClassification = {};

	books.forEach(book => {
		insertIfNotDefined(status, book.status);
		book.authors.forEach(author => {
			insertIfNotDefined(authors, author);
		});
		book.categories.forEach(category => {
			insertIfNotDefined(categories, category);
		});
	});

	const category_array: BookClassificationNew[] = [];
	Object.values(categories).forEach(category => {
		category_array.push({
			index: category_array.length,
			name: category
		});
	});

	const books_indexed: BookIndexed[] = books.map(book => {
		return {
			...book,
			categories: book.categories.map(category => {
				return category_array.findIndex(value => {
					return value.name === category;
				});
			})
		};
	});

	let sums: number[] = [];
	let aggregations: BookClassificationCountNew[] = [];
	for (let count = 0; count < 10; count++) {
		sums = category_array.map(() => 0);
		books_indexed.forEach(book => {
			book.categories.forEach(category => {
				sums[category]++;
			});
		});

		aggregations = sums
			.map((sum, index) => {
				return {
					...category_array[index],
					count: sum
				};
			})
			.filter(aggregate => {
				return aggregate.count;
			})
			.sort((a, b) => {
				return b.count - a.count;
			});
	}

	return {
		aggregations,
		books_indexed,
		status,
		authors,
		categories
	};
}

export const classifications = normaliseBookData(book_data);
