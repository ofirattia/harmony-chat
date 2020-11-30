import {defineMessages} from 'react-intl';

const messages = defineMessages({
	postsTitle: {
		id: 'posts.title',
		defaultMessage: 'Des postes',
		description: 'Posts page title FR',
	},
	addPost: {
		id: 'posts.addPostHeader',
		defaultMessage: 'Ajouter une publication',
		description: 'add post button header',
	},
	loading: {
		id: 'posts.loading',
		defaultMessage: 'Chargement...',
		description: 'Loading tag',
	},
	backToIndex: {
		id: 'posts.backToIndex',
		defaultMessage: 'Retour à l\'index',
		description: 'Back To Index Title',
	},
	deletePost: {
		id: 'posts.deletePost',
		defaultMessage: 'Supprimer le message',
		description: 'Delete Post Title',
	},
	title: {
		id: 'posts.title',
		defaultMessage: 'Titre',
		description: 'Title word',
	},
	categories: {
		id: 'posts.categories',
		defaultMessage: 'Catégories',
		description: 'categories word',
	},
	content: {
		id: 'posts.content',
		defaultMessage: 'Contenu',
		description: 'content word',
	},
	createNewPost: {
		id: 'posts.createNewPost',
		defaultMessage: 'Créer un nouveau message',
		description: 'Create A New Post Title',
	},
	submit: {
		id: 'posts.submit',
		defaultMessage: 'Soumettre',
		description: 'Submit Title',
	},
	cancel: {
		id: 'posts.cancel',
		defaultMessage: 'Annuler',
		description: 'Cancel Title',
	},
	titleError: {
		id: 'posts.titleError',
		defaultMessage: 'Enter a title',
		description: 'Title Error Message',
	},
	categoriesError: {
		id: 'posts.categoriesError',
		defaultMessage: 'Enter categories',
		description: 'Categories Error Message',
	},
	contentError: {
		id: 'posts.contentError',
		defaultMessage: 'Content some content',
		description: 'Content Error Message',
	}
});

export default messages;