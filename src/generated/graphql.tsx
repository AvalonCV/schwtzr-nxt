// tslint:disable: no-any
// tslint:disable: max-line-length
import { TranslationItemKey } from '../shared/localisation/translations';
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
	{ [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	/** Multilanguage-Object_Key */
	MLOKey: TranslationItemKey;
	/** Date custom scalar type */
	Date: Date;
	/** The `Upload` scalar type represents a file upload. */
	Upload: any;
};

export type Book = {
	__typename?: 'Book';
	title: Scalars['String'];
	isbn?: Maybe<Scalars['String']>;
	pageCount: Scalars['Int'];
	publishedDate?: Maybe<Scalars['String']>;
	thumbnailUrl?: Maybe<Scalars['String']>;
	shortDescription?: Maybe<Scalars['String']>;
	longDescription?: Maybe<Scalars['String']>;
	status: Scalars['String'];
	authors: Array<Maybe<Scalars['String']>>;
	categories: Array<Maybe<Scalars['String']>>;
};

export enum CacheControlScope {
	Public = 'PUBLIC',
	Private = 'PRIVATE'
}

export type Document = {
	__typename?: 'Document';
	title: Scalars['String'];
	teaser_image?: Maybe<Image>;
	markdown_content: Scalars['String'];
};

export type Footer = {
	__typename?: 'Footer';
	sections: Array<NavigationSection>;
};

export type Header = {
	__typename?: 'Header';
	sections: Array<NavigationSection>;
};

export type Image = {
	__typename?: 'Image';
	url: Scalars['String'];
	height?: Maybe<Scalars['Int']>;
	width?: Maybe<Scalars['Int']>;
	alt?: Maybe<Scalars['String']>;
};

export type Mutation = {
	__typename?: 'Mutation';
	_?: Maybe<Scalars['Boolean']>;
};

export type NavigationSection = {
	__typename?: 'NavigationSection';
	section_key: Scalars['String'];
	headline_mlo_key?: Maybe<Scalars['MLOKey']>;
	description_mlo_key?: Maybe<Scalars['MLOKey']>;
	elements: Array<NavigationSectionElement>;
};

export type NavigationSectionElement = {
	__typename?: 'NavigationSectionElement';
	icon?: Maybe<Scalars['String']>;
	show_as_highlight?: Maybe<Scalars['Boolean']>;
	name_mlo_key?: Maybe<Scalars['MLOKey']>;
	description_mlo_key?: Maybe<Scalars['MLOKey']>;
};

export type Query = {
	__typename?: 'Query';
	_?: Maybe<Scalars['Boolean']>;
	getDocument?: Maybe<Document>;
	getHeaderNavigation: Header;
	getFooterNavigation: Footer;
	getNavigationSection?: Maybe<NavigationSection>;
	getBook?: Maybe<Book>;
	getBooks: Array<Maybe<Book>>;
	searchBooks: Array<Maybe<Book>>;
};

export type QueryGetDocumentArgs = {
	identifier?: Maybe<Scalars['String']>;
};

export type QueryGetNavigationSectionArgs = {
	id: Scalars['ID'];
};

export type QueryGetBookArgs = {
	isbn?: Maybe<Scalars['String']>;
};

export type QueryGetBooksArgs = {
	q?: Maybe<Scalars['String']>;
	status?: Maybe<Array<Maybe<Scalars['String']>>>;
	authors?: Maybe<Array<Maybe<Scalars['String']>>>;
	categories?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type QuerySearchBooksArgs = {
	q?: Maybe<Scalars['String']>;
	status?: Maybe<Array<Maybe<Scalars['String']>>>;
	authors?: Maybe<Array<Maybe<Scalars['String']>>>;
	categories?: Maybe<Array<Maybe<Scalars['String']>>>;
	rpage?: Maybe<Scalars['Int']>;
	results_per_page?: Maybe<Scalars['Int']>;
};

export type Subscription = {
	__typename?: 'Subscription';
	_?: Maybe<Scalars['Boolean']>;
};

export type GetFooterDataQueryVariables = {};

export type GetFooterDataQuery = { __typename?: 'Query' } & {
	getFooterNavigation: { __typename?: 'Footer' } & {
		sections: Array<
			{ __typename?: 'NavigationSection' } & Pick<
				NavigationSection,
				'section_key' | 'headline_mlo_key' | 'description_mlo_key'
			> & {
					elements: Array<
						{ __typename?: 'NavigationSectionElement' } & Pick<
							NavigationSectionElement,
							'icon' | 'name_mlo_key' | 'description_mlo_key' | 'show_as_highlight'
						>
					>;
				}
		>;
	};
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
	fragment: string;
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
	| ResolverFn<TResult, TParent, TContext, TArgs>
	| StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
	resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
	resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
	| SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
	| SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
	| ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
	| SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
	next: NextResolverFn<TResult>,
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
	Query: ResolverTypeWrapper<{}>;
	Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
	String: ResolverTypeWrapper<Scalars['String']>;
	Document: ResolverTypeWrapper<Document>;
	Image: ResolverTypeWrapper<Image>;
	Int: ResolverTypeWrapper<Scalars['Int']>;
	Header: ResolverTypeWrapper<Header>;
	NavigationSection: ResolverTypeWrapper<NavigationSection>;
	MLOKey: ResolverTypeWrapper<Scalars['MLOKey']>;
	NavigationSectionElement: ResolverTypeWrapper<NavigationSectionElement>;
	Footer: ResolverTypeWrapper<Footer>;
	ID: ResolverTypeWrapper<Scalars['ID']>;
	Book: ResolverTypeWrapper<Book>;
	Mutation: ResolverTypeWrapper<{}>;
	Subscription: ResolverTypeWrapper<{}>;
	CacheControlScope: CacheControlScope;
	Date: ResolverTypeWrapper<Scalars['Date']>;
	Upload: ResolverTypeWrapper<Scalars['Upload']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
	Query: {};
	Boolean: Scalars['Boolean'];
	String: Scalars['String'];
	Document: Document;
	Image: Image;
	Int: Scalars['Int'];
	Header: Header;
	NavigationSection: NavigationSection;
	MLOKey: Scalars['MLOKey'];
	NavigationSectionElement: NavigationSectionElement;
	Footer: Footer;
	ID: Scalars['ID'];
	Book: Book;
	Mutation: {};
	Subscription: {};
	CacheControlScope: CacheControlScope;
	Date: Scalars['Date'];
	Upload: Scalars['Upload'];
};

export type CacheControlDirectiveResolver<
	Result,
	Parent,
	ContextType = any,
	Args = { maxAge?: Maybe<Maybe<Scalars['Int']>>; scope?: Maybe<Maybe<CacheControlScope>> }
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type BookResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']
> = {
	title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	isbn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	pageCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
	publishedDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	thumbnailUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	shortDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	longDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	authors?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
	categories?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
	name: 'Date';
}

export type DocumentResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Document'] = ResolversParentTypes['Document']
> = {
	title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	teaser_image?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
	markdown_content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type FooterResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Footer'] = ResolversParentTypes['Footer']
> = {
	sections?: Resolver<Array<ResolversTypes['NavigationSection']>, ParentType, ContextType>;
};

export type HeaderResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Header'] = ResolversParentTypes['Header']
> = {
	sections?: Resolver<Array<ResolversTypes['NavigationSection']>, ParentType, ContextType>;
};

export type ImageResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']
> = {
	url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
	width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
	alt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export interface MloKeyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MLOKey'], any> {
	name: 'MLOKey';
}

export type MutationResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
	_?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
};

export type NavigationSectionResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['NavigationSection'] = ResolversParentTypes['NavigationSection']
> = {
	section_key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	headline_mlo_key?: Resolver<Maybe<ResolversTypes['MLOKey']>, ParentType, ContextType>;
	description_mlo_key?: Resolver<Maybe<ResolversTypes['MLOKey']>, ParentType, ContextType>;
	elements?: Resolver<Array<ResolversTypes['NavigationSectionElement']>, ParentType, ContextType>;
};

export type NavigationSectionElementResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['NavigationSectionElement'] = ResolversParentTypes['NavigationSectionElement']
> = {
	icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	show_as_highlight?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
	name_mlo_key?: Resolver<Maybe<ResolversTypes['MLOKey']>, ParentType, ContextType>;
	description_mlo_key?: Resolver<Maybe<ResolversTypes['MLOKey']>, ParentType, ContextType>;
};

export type QueryResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
	_?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
	getDocument?: Resolver<Maybe<ResolversTypes['Document']>, ParentType, ContextType, QueryGetDocumentArgs>;
	getHeaderNavigation?: Resolver<ResolversTypes['Header'], ParentType, ContextType>;
	getFooterNavigation?: Resolver<ResolversTypes['Footer'], ParentType, ContextType>;
	getNavigationSection?: Resolver<
		Maybe<ResolversTypes['NavigationSection']>,
		ParentType,
		ContextType,
		RequireFields<QueryGetNavigationSectionArgs, 'id'>
	>;
	getBook?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType, QueryGetBookArgs>;
	getBooks?: Resolver<Array<Maybe<ResolversTypes['Book']>>, ParentType, ContextType, QueryGetBooksArgs>;
	searchBooks?: Resolver<
		Array<Maybe<ResolversTypes['Book']>>,
		ParentType,
		ContextType,
		RequireFields<QuerySearchBooksArgs, 'rpage' | 'results_per_page'>
	>;
};

export type SubscriptionResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = {
	_?: SubscriptionResolver<Maybe<ResolversTypes['Boolean']>, '_', ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
	name: 'Upload';
}

export type Resolvers<ContextType = any> = {
	Book?: BookResolvers<ContextType>;
	Date?: GraphQLScalarType;
	Document?: DocumentResolvers<ContextType>;
	Footer?: FooterResolvers<ContextType>;
	Header?: HeaderResolvers<ContextType>;
	Image?: ImageResolvers<ContextType>;
	MLOKey?: GraphQLScalarType;
	Mutation?: MutationResolvers<ContextType>;
	NavigationSection?: NavigationSectionResolvers<ContextType>;
	NavigationSectionElement?: NavigationSectionElementResolvers<ContextType>;
	Query?: QueryResolvers<ContextType>;
	Subscription?: SubscriptionResolvers<ContextType>;
	Upload?: GraphQLScalarType;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
	cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
};

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;
