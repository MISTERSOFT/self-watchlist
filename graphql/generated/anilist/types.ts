import type { DocumentNode } from 'graphql'
import { gql } from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never
}
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  CountryCode: { input: any; output: any }
  FuzzyDateInt: { input: any; output: any }
  Json: { input: any; output: any }
}

/** Notification for when a activity is liked */
export type ActivityLikeNotification = {
  readonly __typename?: 'ActivityLikeNotification'
  /** The liked activity */
  readonly activity?: Maybe<ActivityUnion>
  /** The id of the activity which was liked */
  readonly activityId: Scalars['Int']['output']
  /** The notification context text */
  readonly context?: Maybe<Scalars['String']['output']>
  /** The time the notification was created at */
  readonly createdAt?: Maybe<Scalars['Int']['output']>
  /** The id of the Notification */
  readonly id: Scalars['Int']['output']
  /** The type of notification */
  readonly type?: Maybe<NotificationType | `${NotificationType}`>
  /** The user who liked the activity */
  readonly user?: Maybe<User>
  /** The id of the user who liked to the activity */
  readonly userId: Scalars['Int']['output']
}

/** Notification for when authenticated user is @ mentioned in activity or reply */
export type ActivityMentionNotification = {
  readonly __typename?: 'ActivityMentionNotification'
  /** The liked activity */
  readonly activity?: Maybe<ActivityUnion>
  /** The id of the activity where mentioned */
  readonly activityId: Scalars['Int']['output']
  /** The notification context text */
  readonly context?: Maybe<Scalars['String']['output']>
  /** The time the notification was created at */
  readonly createdAt?: Maybe<Scalars['Int']['output']>
  /** The id of the Notification */
  readonly id: Scalars['Int']['output']
  /** The type of notification */
  readonly type?: Maybe<NotificationType | `${NotificationType}`>
  /** The user who mentioned the authenticated user */
  readonly user?: Maybe<User>
  /** The id of the user who mentioned the authenticated user */
  readonly userId: Scalars['Int']['output']
}

/** Notification for when a user is send an activity message */
export type ActivityMessageNotification = {
  readonly __typename?: 'ActivityMessageNotification'
  /** The id of the activity message */
  readonly activityId: Scalars['Int']['output']
  /** The notification context text */
  readonly context?: Maybe<Scalars['String']['output']>
  /** The time the notification was created at */
  readonly createdAt?: Maybe<Scalars['Int']['output']>
  /** The id of the Notification */
  readonly id: Scalars['Int']['output']
  /** The message activity */
  readonly message?: Maybe<MessageActivity>
  /** The type of notification */
  readonly type?: Maybe<NotificationType | `${NotificationType}`>
  /** The user who sent the message */
  readonly user?: Maybe<User>
  /** The if of the user who send the message */
  readonly userId: Scalars['Int']['output']
}

/** Replay to an activity item */
export type ActivityReply = {
  readonly __typename?: 'ActivityReply'
  /** The id of the parent activity */
  readonly activityId?: Maybe<Scalars['Int']['output']>
  /** The time the reply was created at */
  readonly createdAt: Scalars['Int']['output']
  /** The id of the reply */
  readonly id: Scalars['Int']['output']
  /** If the currently authenticated user liked the reply */
  readonly isLiked?: Maybe<Scalars['Boolean']['output']>
  /** The amount of likes the reply has */
  readonly likeCount: Scalars['Int']['output']
  /** The users who liked the reply */
  readonly likes?: Maybe<ReadonlyArray<Maybe<User>>>
  /** The reply text */
  readonly text?: Maybe<Scalars['String']['output']>
  /** The user who created reply */
  readonly user?: Maybe<User>
  /** The id of the replies creator */
  readonly userId?: Maybe<Scalars['Int']['output']>
}

/** Replay to an activity item */
export type ActivityReplyTextArgs = {
  asHtml?: InputMaybe<Scalars['Boolean']['input']>
}

/** Notification for when a activity reply is liked */
export type ActivityReplyLikeNotification = {
  readonly __typename?: 'ActivityReplyLikeNotification'
  /** The liked activity */
  readonly activity?: Maybe<ActivityUnion>
  /** The id of the activity where the reply which was liked */
  readonly activityId: Scalars['Int']['output']
  /** The notification context text */
  readonly context?: Maybe<Scalars['String']['output']>
  /** The time the notification was created at */
  readonly createdAt?: Maybe<Scalars['Int']['output']>
  /** The id of the Notification */
  readonly id: Scalars['Int']['output']
  /** The type of notification */
  readonly type?: Maybe<NotificationType | `${NotificationType}`>
  /** The user who liked the activity reply */
  readonly user?: Maybe<User>
  /** The id of the user who liked to the activity reply */
  readonly userId: Scalars['Int']['output']
}

/** Notification for when a user replies to the authenticated users activity */
export type ActivityReplyNotification = {
  readonly __typename?: 'ActivityReplyNotification'
  /** The liked activity */
  readonly activity?: Maybe<ActivityUnion>
  /** The id of the activity which was replied too */
  readonly activityId: Scalars['Int']['output']
  /** The notification context text */
  readonly context?: Maybe<Scalars['String']['output']>
  /** The time the notification was created at */
  readonly createdAt?: Maybe<Scalars['Int']['output']>
  /** The id of the Notification */
  readonly id: Scalars['Int']['output']
  /** The type of notification */
  readonly type?: Maybe<NotificationType | `${NotificationType}`>
  /** The user who replied to the activity */
  readonly user?: Maybe<User>
  /** The id of the user who replied to the activity */
  readonly userId: Scalars['Int']['output']
}

/** Notification for when a user replies to activity the authenticated user has replied to */
export type ActivityReplySubscribedNotification = {
  readonly __typename?: 'ActivityReplySubscribedNotification'
  /** The liked activity */
  readonly activity?: Maybe<ActivityUnion>
  /** The id of the activity which was replied too */
  readonly activityId: Scalars['Int']['output']
  /** The notification context text */
  readonly context?: Maybe<Scalars['String']['output']>
  /** The time the notification was created at */
  readonly createdAt?: Maybe<Scalars['Int']['output']>
  /** The id of the Notification */
  readonly id: Scalars['Int']['output']
  /** The type of notification */
  readonly type?: Maybe<NotificationType | `${NotificationType}`>
  /** The user who replied to the activity */
  readonly user?: Maybe<User>
  /** The id of the user who replied to the activity */
  readonly userId: Scalars['Int']['output']
}

/** Activity sort enums */
export type ActivitySort = 'ID' | 'ID_DESC' | 'PINNED'

/** Activity type enum. */
export type ActivityType =
  /** A anime list update activity */
  | 'ANIME_LIST'
  /** A manga list update activity */
  | 'MANGA_LIST'
  /** Anime & Manga list update, only used in query arguments */
  | 'MEDIA_LIST'
  /** A text message activity sent to another user */
  | 'MESSAGE'
  /** A text activity */
  | 'TEXT'

/** Activity union type */
export type ActivityUnion = ListActivity | MessageActivity | TextActivity

/** Notification for when an episode of anime airs */
export type AiringNotification = {
  readonly __typename?: 'AiringNotification'
  /** The id of the aired anime */
  readonly animeId: Scalars['Int']['output']
  /** The notification context text */
  readonly contexts?: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>
  /** The time the notification was created at */
  readonly createdAt?: Maybe<Scalars['Int']['output']>
  /** The episode number that just aired */
  readonly episode: Scalars['Int']['output']
  /** The id of the Notification */
  readonly id: Scalars['Int']['output']
  /** The associated media of the airing schedule */
  readonly media?: Maybe<Media>
  /** The type of notification */
  readonly type?: Maybe<NotificationType | `${NotificationType}`>
}

/** Score & Watcher stats for airing anime by episode and mid-week */
export type AiringProgression = {
  readonly __typename?: 'AiringProgression'
  /** The episode the stats were recorded at. .5 is the mid point between 2 episodes airing dates. */
  readonly episode?: Maybe<Scalars['Float']['output']>
  /** The average score for the media */
  readonly score?: Maybe<Scalars['Float']['output']>
  /** The amount of users watching the anime */
  readonly watching?: Maybe<Scalars['Int']['output']>
}

/** Media Airing Schedule. NOTE: We only aim to guarantee that FUTURE airing data is present and accurate. */
export type AiringSchedule = {
  readonly __typename?: 'AiringSchedule'
  /** The time the episode airs at */
  readonly airingAt: Scalars['Int']['output']
  /** The airing episode number */
  readonly episode: Scalars['Int']['output']
  /** The id of the airing schedule item */
  readonly id: Scalars['Int']['output']
  /** The associate media of the airing episode */
  readonly media?: Maybe<Media>
  /** The associate media id of the airing episode */
  readonly mediaId: Scalars['Int']['output']
  /** Seconds until episode starts airing */
  readonly timeUntilAiring: Scalars['Int']['output']
}

export type AiringScheduleConnection = {
  readonly __typename?: 'AiringScheduleConnection'
  readonly edges?: Maybe<ReadonlyArray<Maybe<AiringScheduleEdge>>>
  readonly nodes?: Maybe<ReadonlyArray<Maybe<AiringSchedule>>>
  /** The pagination information */
  readonly pageInfo?: Maybe<PageInfo>
}

/** AiringSchedule connection edge */
export type AiringScheduleEdge = {
  readonly __typename?: 'AiringScheduleEdge'
  /** The id of the connection */
  readonly id?: Maybe<Scalars['Int']['output']>
  readonly node?: Maybe<AiringSchedule>
}

export type AiringScheduleInput = {
  readonly airingAt?: InputMaybe<Scalars['Int']['input']>
  readonly episode?: InputMaybe<Scalars['Int']['input']>
  readonly timeUntilAiring?: InputMaybe<Scalars['Int']['input']>
}

/** Airing schedule sort enums */
export type AiringSort =
  | 'EPISODE'
  | 'EPISODE_DESC'
  | 'ID'
  | 'ID_DESC'
  | 'MEDIA_ID'
  | 'MEDIA_ID_DESC'
  | 'TIME'
  | 'TIME_DESC'

export type AniChartHighlightInput = {
  readonly highlight?: InputMaybe<Scalars['String']['input']>
  readonly mediaId?: InputMaybe<Scalars['Int']['input']>
}

export type AniChartUser = {
  readonly __typename?: 'AniChartUser'
  readonly highlights?: Maybe<Scalars['Json']['output']>
  readonly settings?: Maybe<Scalars['Json']['output']>
  readonly user?: Maybe<User>
}

/** A character that features in an anime or manga */
export type Character = {
  readonly __typename?: 'Character'
  /** The character's age. Note this is a string, not an int, it may contain further text and additional ages. */
  readonly age?: Maybe<Scalars['String']['output']>
  /** The characters blood type */
  readonly bloodType?: Maybe<Scalars['String']['output']>
  /** The character's birth date */
  readonly dateOfBirth?: Maybe<FuzzyDate>
  /** A general description of the character */
  readonly description?: Maybe<Scalars['String']['output']>
  /** The amount of user's who have favourited the character */
  readonly favourites?: Maybe<Scalars['Int']['output']>
  /** The character's gender. Usually Male, Female, or Non-binary but can be any string. */
  readonly gender?: Maybe<Scalars['String']['output']>
  /** The id of the character */
  readonly id: Scalars['Int']['output']
  /** Character images */
  readonly image?: Maybe<CharacterImage>
  /** If the character is marked as favourite by the currently authenticated user */
  readonly isFavourite: Scalars['Boolean']['output']
  /** If the character is blocked from being added to favourites */
  readonly isFavouriteBlocked: Scalars['Boolean']['output']
  /** Media that includes the character */
  readonly media?: Maybe<MediaConnection>
  /** Notes for site moderators */
  readonly modNotes?: Maybe<Scalars['String']['output']>
  /** The names of the character */
  readonly name?: Maybe<CharacterName>
  /** The url for the character page on the AniList website */
  readonly siteUrl?: Maybe<Scalars['String']['output']>
  /** @deprecated No data available */
  readonly updatedAt?: Maybe<Scalars['Int']['output']>
}

/** A character that features in an anime or manga */
export type CharacterDescriptionArgs = {
  asHtml?: InputMaybe<Scalars['Boolean']['input']>
}

/** A character that features in an anime or manga */
export type CharacterMediaArgs = {
  onList?: InputMaybe<Scalars['Boolean']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  perPage?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<MediaSort>>>
  type?: InputMaybe<MediaType>
}

export type CharacterConnection = {
  readonly __typename?: 'CharacterConnection'
  readonly edges?: Maybe<ReadonlyArray<Maybe<CharacterEdge>>>
  readonly nodes?: Maybe<ReadonlyArray<Maybe<Character>>>
  /** The pagination information */
  readonly pageInfo?: Maybe<PageInfo>
}

/** Character connection edge */
export type CharacterEdge = {
  readonly __typename?: 'CharacterEdge'
  /** The order the character should be displayed from the users favourites */
  readonly favouriteOrder?: Maybe<Scalars['Int']['output']>
  /** The id of the connection */
  readonly id?: Maybe<Scalars['Int']['output']>
  /** The media the character is in */
  readonly media?: Maybe<ReadonlyArray<Maybe<Media>>>
  /** Media specific character name */
  readonly name?: Maybe<Scalars['String']['output']>
  readonly node?: Maybe<Character>
  /** The characters role in the media */
  readonly role?: Maybe<CharacterRole | `${CharacterRole}`>
  /** The voice actors of the character with role date */
  readonly voiceActorRoles?: Maybe<ReadonlyArray<Maybe<StaffRoleType>>>
  /** The voice actors of the character */
  readonly voiceActors?: Maybe<ReadonlyArray<Maybe<Staff>>>
}

/** Character connection edge */
export type CharacterEdgeVoiceActorRolesArgs = {
  language?: InputMaybe<StaffLanguage>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<StaffSort>>>
}

/** Character connection edge */
export type CharacterEdgeVoiceActorsArgs = {
  language?: InputMaybe<StaffLanguage>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<StaffSort>>>
}

export type CharacterImage = {
  readonly __typename?: 'CharacterImage'
  /** The character's image of media at its largest size */
  readonly large?: Maybe<Scalars['String']['output']>
  /** The character's image of media at medium size */
  readonly medium?: Maybe<Scalars['String']['output']>
}

/** The names of the character */
export type CharacterName = {
  readonly __typename?: 'CharacterName'
  /** Other names the character might be referred to as */
  readonly alternative?: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>
  /** Other names the character might be referred to as but are spoilers */
  readonly alternativeSpoiler?: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>
  /** The character's given name */
  readonly first?: Maybe<Scalars['String']['output']>
  /** The character's first and last name */
  readonly full?: Maybe<Scalars['String']['output']>
  /** The character's surname */
  readonly last?: Maybe<Scalars['String']['output']>
  /** The character's middle name */
  readonly middle?: Maybe<Scalars['String']['output']>
  /** The character's full name in their native language */
  readonly native?: Maybe<Scalars['String']['output']>
  /** The currently authenticated users preferred name language. Default romaji for non-authenticated */
  readonly userPreferred?: Maybe<Scalars['String']['output']>
}

/** The names of the character */
export type CharacterNameInput = {
  /** Other names the character might be referred by */
  readonly alternative?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>
  /** Other names the character might be referred to as but are spoilers */
  readonly alternativeSpoiler?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>
  /** The character's given name */
  readonly first?: InputMaybe<Scalars['String']['input']>
  /** The character's surname */
  readonly last?: InputMaybe<Scalars['String']['input']>
  /** The character's middle name */
  readonly middle?: InputMaybe<Scalars['String']['input']>
  /** The character's full name in their native language */
  readonly native?: InputMaybe<Scalars['String']['input']>
}

/** The role the character plays in the media */
export type CharacterRole =
  /** A background character in the media */
  | 'BACKGROUND'
  /** A primary character role in the media */
  | 'MAIN'
  /** A supporting character role in the media */
  | 'SUPPORTING'

/** Character sort enums */
export type CharacterSort =
  | 'FAVOURITES'
  | 'FAVOURITES_DESC'
  | 'ID'
  | 'ID_DESC'
  /** Order manually decided by moderators */
  | 'RELEVANCE'
  | 'ROLE'
  | 'ROLE_DESC'
  | 'SEARCH_MATCH'

/** A submission for a character that features in an anime or manga */
export type CharacterSubmission = {
  readonly __typename?: 'CharacterSubmission'
  /** Data Mod assigned to handle the submission */
  readonly assignee?: Maybe<User>
  /** Character that the submission is referencing */
  readonly character?: Maybe<Character>
  readonly createdAt?: Maybe<Scalars['Int']['output']>
  /** The id of the submission */
  readonly id: Scalars['Int']['output']
  /** Whether the submission is locked */
  readonly locked?: Maybe<Scalars['Boolean']['output']>
  /** Inner details of submission status */
  readonly notes?: Maybe<Scalars['String']['output']>
  readonly source?: Maybe<Scalars['String']['output']>
  /** Status of the submission */
  readonly status?: Maybe<SubmissionStatus | `${SubmissionStatus}`>
  /** The character submission changes */
  readonly submission?: Maybe<Character>
  /** Submitter for the submission */
  readonly submitter?: Maybe<User>
}

export type CharacterSubmissionConnection = {
  readonly __typename?: 'CharacterSubmissionConnection'
  readonly edges?: Maybe<ReadonlyArray<Maybe<CharacterSubmissionEdge>>>
  readonly nodes?: Maybe<ReadonlyArray<Maybe<CharacterSubmission>>>
  /** The pagination information */
  readonly pageInfo?: Maybe<PageInfo>
}

/** CharacterSubmission connection edge */
export type CharacterSubmissionEdge = {
  readonly __typename?: 'CharacterSubmissionEdge'
  readonly node?: Maybe<CharacterSubmission>
  /** The characters role in the media */
  readonly role?: Maybe<CharacterRole | `${CharacterRole}`>
  /** The submitted voice actors of the character */
  readonly submittedVoiceActors?: Maybe<ReadonlyArray<Maybe<StaffSubmission>>>
  /** The voice actors of the character */
  readonly voiceActors?: Maybe<ReadonlyArray<Maybe<Staff>>>
}

/** Notification for when a character submission is accepted, partially accepted, or rejected */
export type CharacterSubmissionUpdateNotification = {
  readonly __typename?: 'CharacterSubmissionUpdateNotification'
  /** The character that was modified. */
  readonly character?: Maybe<Character>
  /** The notification context text */
  readonly contexts?: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>
  /** The time the notification was created at */
  readonly createdAt?: Maybe<Scalars['Int']['output']>
  /** The id of the Notification */
  readonly id: Scalars['Int']['output']
  /** The notes of the submission */
  readonly notes?: Maybe<Scalars['String']['output']>
  /** The status of the submission */
  readonly status?: Maybe<Scalars['String']['output']>
  /** The type of notification */
  readonly type?: Maybe<NotificationType | `${NotificationType}`>
}

/** Deleted data type */
export type Deleted = {
  readonly __typename?: 'Deleted'
  /** If an item has been successfully deleted */
  readonly deleted?: Maybe<Scalars['Boolean']['output']>
}

export type ExternalLinkMediaType = 'ANIME' | 'MANGA' | 'STAFF'

export type ExternalLinkType = 'INFO' | 'SOCIAL' | 'STREAMING'

/** User's favourite anime, manga, characters, staff & studios */
export type Favourites = {
  readonly __typename?: 'Favourites'
  /** Favourite anime */
  readonly anime?: Maybe<MediaConnection>
  /** Favourite characters */
  readonly characters?: Maybe<CharacterConnection>
  /** Favourite manga */
  readonly manga?: Maybe<MediaConnection>
  /** Favourite staff */
  readonly staff?: Maybe<StaffConnection>
  /** Favourite studios */
  readonly studios?: Maybe<StudioConnection>
}

/** User's favourite anime, manga, characters, staff & studios */
export type FavouritesAnimeArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
  perPage?: InputMaybe<Scalars['Int']['input']>
}

/** User's favourite anime, manga, characters, staff & studios */
export type FavouritesCharactersArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
  perPage?: InputMaybe<Scalars['Int']['input']>
}

/** User's favourite anime, manga, characters, staff & studios */
export type FavouritesMangaArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
  perPage?: InputMaybe<Scalars['Int']['input']>
}

/** User's favourite anime, manga, characters, staff & studios */
export type FavouritesStaffArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
  perPage?: InputMaybe<Scalars['Int']['input']>
}

/** User's favourite anime, manga, characters, staff & studios */
export type FavouritesStudiosArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
  perPage?: InputMaybe<Scalars['Int']['input']>
}

/** Notification for when the authenticated user is followed by another user */
export type FollowingNotification = {
  readonly __typename?: 'FollowingNotification'
  /** The notification context text */
  readonly context?: Maybe<Scalars['String']['output']>
  /** The time the notification was created at */
  readonly createdAt?: Maybe<Scalars['Int']['output']>
  /** The id of the Notification */
  readonly id: Scalars['Int']['output']
  /** The type of notification */
  readonly type?: Maybe<NotificationType | `${NotificationType}`>
  /** The liked activity */
  readonly user?: Maybe<User>
  /** The id of the user who followed the authenticated user */
  readonly userId: Scalars['Int']['output']
}

/** User's format statistics */
export type FormatStats = {
  readonly __typename?: 'FormatStats'
  readonly amount?: Maybe<Scalars['Int']['output']>
  readonly format?: Maybe<MediaFormat | `${MediaFormat}`>
}

/** Date object that allows for incomplete date values (fuzzy) */
export type FuzzyDate = {
  readonly __typename?: 'FuzzyDate'
  /** Numeric Day (24) */
  readonly day?: Maybe<Scalars['Int']['output']>
  /** Numeric Month (3) */
  readonly month?: Maybe<Scalars['Int']['output']>
  /** Numeric Year (2017) */
  readonly year?: Maybe<Scalars['Int']['output']>
}

/** Date object that allows for incomplete date values (fuzzy) */
export type FuzzyDateInput = {
  /** Numeric Day (24) */
  readonly day?: InputMaybe<Scalars['Int']['input']>
  /** Numeric Month (3) */
  readonly month?: InputMaybe<Scalars['Int']['input']>
  /** Numeric Year (2017) */
  readonly year?: InputMaybe<Scalars['Int']['input']>
}

/** User's genre statistics */
export type GenreStats = {
  readonly __typename?: 'GenreStats'
  readonly amount?: Maybe<Scalars['Int']['output']>
  readonly genre?: Maybe<Scalars['String']['output']>
  readonly meanScore?: Maybe<Scalars['Int']['output']>
  /** The amount of time in minutes the genre has been watched by the user */
  readonly timeWatched?: Maybe<Scalars['Int']['output']>
}

/** Page of data (Used for internal use only) */
export type InternalPage = {
  readonly __typename?: 'InternalPage'
  readonly activities?: Maybe<ReadonlyArray<Maybe<ActivityUnion>>>
  readonly activityReplies?: Maybe<ReadonlyArray<Maybe<ActivityReply>>>
  readonly airingSchedules?: Maybe<ReadonlyArray<Maybe<AiringSchedule>>>
  readonly characterSubmissions?: Maybe<ReadonlyArray<Maybe<CharacterSubmission>>>
  readonly characters?: Maybe<ReadonlyArray<Maybe<Character>>>
  readonly followers?: Maybe<ReadonlyArray<Maybe<User>>>
  readonly following?: Maybe<ReadonlyArray<Maybe<User>>>
  readonly likes?: Maybe<ReadonlyArray<Maybe<User>>>
  readonly media?: Maybe<ReadonlyArray<Maybe<Media>>>
  readonly mediaList?: Maybe<ReadonlyArray<Maybe<MediaList>>>
  readonly mediaSubmissions?: Maybe<ReadonlyArray<Maybe<MediaSubmission>>>
  readonly mediaTrends?: Maybe<ReadonlyArray<Maybe<MediaTrend>>>
  readonly modActions?: Maybe<ReadonlyArray<Maybe<ModAction>>>
  readonly notifications?: Maybe<ReadonlyArray<Maybe<NotificationUnion>>>
  /** The pagination information */
  readonly pageInfo?: Maybe<PageInfo>
  readonly recommendations?: Maybe<ReadonlyArray<Maybe<Recommendation>>>
  readonly reports?: Maybe<ReadonlyArray<Maybe<Report>>>
  readonly reviews?: Maybe<ReadonlyArray<Maybe<Review>>>
  readonly revisionHistory?: Maybe<ReadonlyArray<Maybe<RevisionHistory>>>
  readonly staff?: Maybe<ReadonlyArray<Maybe<Staff>>>
  readonly staffSubmissions?: Maybe<ReadonlyArray<Maybe<StaffSubmission>>>
  readonly studios?: Maybe<ReadonlyArray<Maybe<Studio>>>
  readonly threadComments?: Maybe<ReadonlyArray<Maybe<ThreadComment>>>
  readonly threads?: Maybe<ReadonlyArray<Maybe<Thread>>>
  readonly userBlockSearch?: Maybe<ReadonlyArray<Maybe<User>>>
  readonly users?: Maybe<ReadonlyArray<Maybe<User>>>
}

/** Page of data (Used for internal use only) */
export type InternalPageActivitiesArgs = {
  createdAt?: InputMaybe<Scalars['Int']['input']>
  createdAt_greater?: InputMaybe<Scalars['Int']['input']>
  createdAt_lesser?: InputMaybe<Scalars['Int']['input']>
  hasReplies?: InputMaybe<Scalars['Boolean']['input']>
  hasRepliesOrTypeText?: InputMaybe<Scalars['Boolean']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
  id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  id_not?: InputMaybe<Scalars['Int']['input']>
  id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  isFollowing?: InputMaybe<Scalars['Boolean']['input']>
  mediaId?: InputMaybe<Scalars['Int']['input']>
  mediaId_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  mediaId_not?: InputMaybe<Scalars['Int']['input']>
  mediaId_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  messengerId?: InputMaybe<Scalars['Int']['input']>
  messengerId_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  messengerId_not?: InputMaybe<Scalars['Int']['input']>
  messengerId_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<ActivitySort>>>
  type?: InputMaybe<ActivityType>
  type_in?: InputMaybe<ReadonlyArray<InputMaybe<ActivityType>>>
  type_not?: InputMaybe<ActivityType>
  type_not_in?: InputMaybe<ReadonlyArray<InputMaybe<ActivityType>>>
  userId?: InputMaybe<Scalars['Int']['input']>
  userId_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  userId_not?: InputMaybe<Scalars['Int']['input']>
  userId_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
}

/** Page of data (Used for internal use only) */
export type InternalPageActivityRepliesArgs = {
  activityId?: InputMaybe<Scalars['Int']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
}

/** Page of data (Used for internal use only) */
export type InternalPageAiringSchedulesArgs = {
  airingAt?: InputMaybe<Scalars['Int']['input']>
  airingAt_greater?: InputMaybe<Scalars['Int']['input']>
  airingAt_lesser?: InputMaybe<Scalars['Int']['input']>
  episode?: InputMaybe<Scalars['Int']['input']>
  episode_greater?: InputMaybe<Scalars['Int']['input']>
  episode_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  episode_lesser?: InputMaybe<Scalars['Int']['input']>
  episode_not?: InputMaybe<Scalars['Int']['input']>
  episode_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  id?: InputMaybe<Scalars['Int']['input']>
  id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  id_not?: InputMaybe<Scalars['Int']['input']>
  id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  mediaId?: InputMaybe<Scalars['Int']['input']>
  mediaId_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  mediaId_not?: InputMaybe<Scalars['Int']['input']>
  mediaId_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  notYetAired?: InputMaybe<Scalars['Boolean']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<AiringSort>>>
}

/** Page of data (Used for internal use only) */
export type InternalPageCharacterSubmissionsArgs = {
  assigneeId?: InputMaybe<Scalars['Int']['input']>
  characterId?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<SubmissionSort>>>
  status?: InputMaybe<SubmissionStatus>
  userId?: InputMaybe<Scalars['Int']['input']>
}

/** Page of data (Used for internal use only) */
export type InternalPageCharactersArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
  id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  id_not?: InputMaybe<Scalars['Int']['input']>
  id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  isBirthday?: InputMaybe<Scalars['Boolean']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<CharacterSort>>>
}

/** Page of data (Used for internal use only) */
export type InternalPageFollowersArgs = {
  sort?: InputMaybe<ReadonlyArray<InputMaybe<UserSort>>>
  userId: Scalars['Int']['input']
}

/** Page of data (Used for internal use only) */
export type InternalPageFollowingArgs = {
  sort?: InputMaybe<ReadonlyArray<InputMaybe<UserSort>>>
  userId: Scalars['Int']['input']
}

/** Page of data (Used for internal use only) */
export type InternalPageLikesArgs = {
  likeableId?: InputMaybe<Scalars['Int']['input']>
  type?: InputMaybe<LikeableType>
}

/** Page of data (Used for internal use only) */
export type InternalPageMediaArgs = {
  averageScore?: InputMaybe<Scalars['Int']['input']>
  averageScore_greater?: InputMaybe<Scalars['Int']['input']>
  averageScore_lesser?: InputMaybe<Scalars['Int']['input']>
  averageScore_not?: InputMaybe<Scalars['Int']['input']>
  chapters?: InputMaybe<Scalars['Int']['input']>
  chapters_greater?: InputMaybe<Scalars['Int']['input']>
  chapters_lesser?: InputMaybe<Scalars['Int']['input']>
  countryOfOrigin?: InputMaybe<Scalars['CountryCode']['input']>
  duration?: InputMaybe<Scalars['Int']['input']>
  duration_greater?: InputMaybe<Scalars['Int']['input']>
  duration_lesser?: InputMaybe<Scalars['Int']['input']>
  endDate?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  endDate_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  endDate_lesser?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  endDate_like?: InputMaybe<Scalars['String']['input']>
  episodes?: InputMaybe<Scalars['Int']['input']>
  episodes_greater?: InputMaybe<Scalars['Int']['input']>
  episodes_lesser?: InputMaybe<Scalars['Int']['input']>
  format?: InputMaybe<MediaFormat>
  format_in?: InputMaybe<ReadonlyArray<InputMaybe<MediaFormat>>>
  format_not?: InputMaybe<MediaFormat>
  format_not_in?: InputMaybe<ReadonlyArray<InputMaybe<MediaFormat>>>
  genre?: InputMaybe<Scalars['String']['input']>
  genre_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>
  genre_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>
  id?: InputMaybe<Scalars['Int']['input']>
  idMal?: InputMaybe<Scalars['Int']['input']>
  idMal_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  idMal_not?: InputMaybe<Scalars['Int']['input']>
  idMal_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  id_not?: InputMaybe<Scalars['Int']['input']>
  id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  isAdult?: InputMaybe<Scalars['Boolean']['input']>
  isLicensed?: InputMaybe<Scalars['Boolean']['input']>
  licensedBy?: InputMaybe<Scalars['String']['input']>
  licensedById?: InputMaybe<Scalars['Int']['input']>
  licensedById_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  licensedBy_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>
  minimumTagRank?: InputMaybe<Scalars['Int']['input']>
  onList?: InputMaybe<Scalars['Boolean']['input']>
  popularity?: InputMaybe<Scalars['Int']['input']>
  popularity_greater?: InputMaybe<Scalars['Int']['input']>
  popularity_lesser?: InputMaybe<Scalars['Int']['input']>
  popularity_not?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  season?: InputMaybe<MediaSeason>
  seasonYear?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<MediaSort>>>
  source?: InputMaybe<MediaSource>
  source_in?: InputMaybe<ReadonlyArray<InputMaybe<MediaSource>>>
  startDate?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  startDate_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  startDate_lesser?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  startDate_like?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<MediaStatus>
  status_in?: InputMaybe<ReadonlyArray<InputMaybe<MediaStatus>>>
  status_not?: InputMaybe<MediaStatus>
  status_not_in?: InputMaybe<ReadonlyArray<InputMaybe<MediaStatus>>>
  tag?: InputMaybe<Scalars['String']['input']>
  tagCategory?: InputMaybe<Scalars['String']['input']>
  tagCategory_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>
  tagCategory_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>
  tag_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>
  tag_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>
  type?: InputMaybe<MediaType>
  volumes?: InputMaybe<Scalars['Int']['input']>
  volumes_greater?: InputMaybe<Scalars['Int']['input']>
  volumes_lesser?: InputMaybe<Scalars['Int']['input']>
}

/** Page of data (Used for internal use only) */
export type InternalPageMediaListArgs = {
  compareWithAuthList?: InputMaybe<Scalars['Boolean']['input']>
  completedAt?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  completedAt_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  completedAt_lesser?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  completedAt_like?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
  isFollowing?: InputMaybe<Scalars['Boolean']['input']>
  mediaId?: InputMaybe<Scalars['Int']['input']>
  mediaId_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  mediaId_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  notes?: InputMaybe<Scalars['String']['input']>
  notes_like?: InputMaybe<Scalars['String']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<MediaListSort>>>
  startedAt?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  startedAt_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  startedAt_lesser?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  startedAt_like?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<MediaListStatus>
  status_in?: InputMaybe<ReadonlyArray<InputMaybe<MediaListStatus>>>
  status_not?: InputMaybe<MediaListStatus>
  status_not_in?: InputMaybe<ReadonlyArray<InputMaybe<MediaListStatus>>>
  type?: InputMaybe<MediaType>
  userId?: InputMaybe<Scalars['Int']['input']>
  userId_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  userName?: InputMaybe<Scalars['String']['input']>
}

/** Page of data (Used for internal use only) */
export type InternalPageMediaSubmissionsArgs = {
  assigneeId?: InputMaybe<Scalars['Int']['input']>
  mediaId?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<SubmissionSort>>>
  status?: InputMaybe<SubmissionStatus>
  submissionId?: InputMaybe<Scalars['Int']['input']>
  type?: InputMaybe<MediaType>
  userId?: InputMaybe<Scalars['Int']['input']>
}

/** Page of data (Used for internal use only) */
export type InternalPageMediaTrendsArgs = {
  averageScore?: InputMaybe<Scalars['Int']['input']>
  averageScore_greater?: InputMaybe<Scalars['Int']['input']>
  averageScore_lesser?: InputMaybe<Scalars['Int']['input']>
  averageScore_not?: InputMaybe<Scalars['Int']['input']>
  date?: InputMaybe<Scalars['Int']['input']>
  date_greater?: InputMaybe<Scalars['Int']['input']>
  date_lesser?: InputMaybe<Scalars['Int']['input']>
  episode?: InputMaybe<Scalars['Int']['input']>
  episode_greater?: InputMaybe<Scalars['Int']['input']>
  episode_lesser?: InputMaybe<Scalars['Int']['input']>
  episode_not?: InputMaybe<Scalars['Int']['input']>
  mediaId?: InputMaybe<Scalars['Int']['input']>
  mediaId_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  mediaId_not?: InputMaybe<Scalars['Int']['input']>
  mediaId_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  popularity?: InputMaybe<Scalars['Int']['input']>
  popularity_greater?: InputMaybe<Scalars['Int']['input']>
  popularity_lesser?: InputMaybe<Scalars['Int']['input']>
  popularity_not?: InputMaybe<Scalars['Int']['input']>
  releasing?: InputMaybe<Scalars['Boolean']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<MediaTrendSort>>>
  trending?: InputMaybe<Scalars['Int']['input']>
  trending_greater?: InputMaybe<Scalars['Int']['input']>
  trending_lesser?: InputMaybe<Scalars['Int']['input']>
  trending_not?: InputMaybe<Scalars['Int']['input']>
}

/** Page of data (Used for internal use only) */
export type InternalPageModActionsArgs = {
  modId?: InputMaybe<Scalars['Int']['input']>
  userId?: InputMaybe<Scalars['Int']['input']>
}

/** Page of data (Used for internal use only) */
export type InternalPageNotificationsArgs = {
  resetNotificationCount?: InputMaybe<Scalars['Boolean']['input']>
  type?: InputMaybe<NotificationType>
  type_in?: InputMaybe<ReadonlyArray<InputMaybe<NotificationType>>>
}

/** Page of data (Used for internal use only) */
export type InternalPageRecommendationsArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
  mediaId?: InputMaybe<Scalars['Int']['input']>
  mediaRecommendationId?: InputMaybe<Scalars['Int']['input']>
  onList?: InputMaybe<Scalars['Boolean']['input']>
  rating?: InputMaybe<Scalars['Int']['input']>
  rating_greater?: InputMaybe<Scalars['Int']['input']>
  rating_lesser?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<RecommendationSort>>>
  userId?: InputMaybe<Scalars['Int']['input']>
}

/** Page of data (Used for internal use only) */
export type InternalPageReportsArgs = {
  reportedId?: InputMaybe<Scalars['Int']['input']>
  reporterId?: InputMaybe<Scalars['Int']['input']>
}

/** Page of data (Used for internal use only) */
export type InternalPageReviewsArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
  mediaId?: InputMaybe<Scalars['Int']['input']>
  mediaType?: InputMaybe<MediaType>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<ReviewSort>>>
  userId?: InputMaybe<Scalars['Int']['input']>
}

/** Page of data (Used for internal use only) */
export type InternalPageRevisionHistoryArgs = {
  characterId?: InputMaybe<Scalars['Int']['input']>
  mediaId?: InputMaybe<Scalars['Int']['input']>
  staffId?: InputMaybe<Scalars['Int']['input']>
  studioId?: InputMaybe<Scalars['Int']['input']>
  userId?: InputMaybe<Scalars['Int']['input']>
}

/** Page of data (Used for internal use only) */
export type InternalPageStaffArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
  id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  id_not?: InputMaybe<Scalars['Int']['input']>
  id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  isBirthday?: InputMaybe<Scalars['Boolean']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<StaffSort>>>
}

/** Page of data (Used for internal use only) */
export type InternalPageStaffSubmissionsArgs = {
  assigneeId?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<SubmissionSort>>>
  staffId?: InputMaybe<Scalars['Int']['input']>
  status?: InputMaybe<SubmissionStatus>
  userId?: InputMaybe<Scalars['Int']['input']>
}

/** Page of data (Used for internal use only) */
export type InternalPageStudiosArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
  id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  id_not?: InputMaybe<Scalars['Int']['input']>
  id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  search?: InputMaybe<Scalars['String']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<StudioSort>>>
}

/** Page of data (Used for internal use only) */
export type InternalPageThreadCommentsArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<ThreadCommentSort>>>
  threadId?: InputMaybe<Scalars['Int']['input']>
  userId?: InputMaybe<Scalars['Int']['input']>
}

/** Page of data (Used for internal use only) */
export type InternalPageThreadsArgs = {
  categoryId?: InputMaybe<Scalars['Int']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
  id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  mediaCategoryId?: InputMaybe<Scalars['Int']['input']>
  replyUserId?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<ThreadSort>>>
  subscribed?: InputMaybe<Scalars['Boolean']['input']>
  userId?: InputMaybe<Scalars['Int']['input']>
}

/** Page of data (Used for internal use only) */
export type InternalPageUserBlockSearchArgs = {
  search?: InputMaybe<Scalars['String']['input']>
}

/** Page of data (Used for internal use only) */
export type InternalPageUsersArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
  isModerator?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<UserSort>>>
}

/** Types that can be liked */
export type LikeableType = 'ACTIVITY' | 'ACTIVITY_REPLY' | 'THREAD' | 'THREAD_COMMENT'

/** Likeable union type */
export type LikeableUnion =
  | ActivityReply
  | ListActivity
  | MessageActivity
  | TextActivity
  | Thread
  | ThreadComment

/** User list activity (anime & manga updates) */
export type ListActivity = {
  readonly __typename?: 'ListActivity'
  /** The time the activity was created at */
  readonly createdAt: Scalars['Int']['output']
  /** The id of the activity */
  readonly id: Scalars['Int']['output']
  /** If the currently authenticated user liked the activity */
  readonly isLiked?: Maybe<Scalars['Boolean']['output']>
  /** If the activity is locked and can receive replies */
  readonly isLocked?: Maybe<Scalars['Boolean']['output']>
  /** If the activity is pinned to the top of the users activity feed */
  readonly isPinned?: Maybe<Scalars['Boolean']['output']>
  /** If the currently authenticated user is subscribed to the activity */
  readonly isSubscribed?: Maybe<Scalars['Boolean']['output']>
  /** The amount of likes the activity has */
  readonly likeCount: Scalars['Int']['output']
  /** The users who liked the activity */
  readonly likes?: Maybe<ReadonlyArray<Maybe<User>>>
  /** The associated media to the activity update */
  readonly media?: Maybe<Media>
  /** The list progress made */
  readonly progress?: Maybe<Scalars['String']['output']>
  /** The written replies to the activity */
  readonly replies?: Maybe<ReadonlyArray<Maybe<ActivityReply>>>
  /** The number of activity replies */
  readonly replyCount: Scalars['Int']['output']
  /** The url for the activity page on the AniList website */
  readonly siteUrl?: Maybe<Scalars['String']['output']>
  /** The list item's textual status */
  readonly status?: Maybe<Scalars['String']['output']>
  /** The type of activity */
  readonly type?: Maybe<ActivityType | `${ActivityType}`>
  /** The owner of the activity */
  readonly user?: Maybe<User>
  /** The user id of the activity's creator */
  readonly userId?: Maybe<Scalars['Int']['output']>
}

export type ListActivityOption = {
  readonly __typename?: 'ListActivityOption'
  readonly disabled?: Maybe<Scalars['Boolean']['output']>
  readonly type?: Maybe<MediaListStatus | `${MediaListStatus}`>
}

export type ListActivityOptionInput = {
  readonly disabled?: InputMaybe<Scalars['Boolean']['input']>
  readonly type?: InputMaybe<MediaListStatus | `${MediaListStatus}`>
}

/** User's list score statistics */
export type ListScoreStats = {
  readonly __typename?: 'ListScoreStats'
  readonly meanScore?: Maybe<Scalars['Int']['output']>
  readonly standardDeviation?: Maybe<Scalars['Int']['output']>
}

/** Anime or Manga */
export type Media = {
  readonly __typename?: 'Media'
  /** The media's entire airing schedule */
  readonly airingSchedule?: Maybe<AiringScheduleConnection>
  /** If the media should have forum thread automatically created for it on airing episode release */
  readonly autoCreateForumThread?: Maybe<Scalars['Boolean']['output']>
  /** A weighted average score of all the user's scores of the media */
  readonly averageScore?: Maybe<Scalars['Int']['output']>
  /** The banner image of the media */
  readonly bannerImage?: Maybe<Scalars['String']['output']>
  /** The amount of chapters the manga has when complete */
  readonly chapters?: Maybe<Scalars['Int']['output']>
  /** The characters in the media */
  readonly characters?: Maybe<CharacterConnection>
  /** Where the media was created. (ISO 3166-1 alpha-2) */
  readonly countryOfOrigin?: Maybe<Scalars['CountryCode']['output']>
  /** The cover images of the media */
  readonly coverImage?: Maybe<MediaCoverImage>
  /** Short description of the media's story and characters */
  readonly description?: Maybe<Scalars['String']['output']>
  /** The general length of each anime episode in minutes */
  readonly duration?: Maybe<Scalars['Int']['output']>
  /** The last official release date of the media */
  readonly endDate?: Maybe<FuzzyDate>
  /** The amount of episodes the anime has when complete */
  readonly episodes?: Maybe<Scalars['Int']['output']>
  /** External links to another site related to the media */
  readonly externalLinks?: Maybe<ReadonlyArray<Maybe<MediaExternalLink>>>
  /** The amount of user's who have favourited the media */
  readonly favourites?: Maybe<Scalars['Int']['output']>
  /** The format the media was released in */
  readonly format?: Maybe<MediaFormat | `${MediaFormat}`>
  /** The genres of the media */
  readonly genres?: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>
  /** Official Twitter hashtags for the media */
  readonly hashtag?: Maybe<Scalars['String']['output']>
  /** The id of the media */
  readonly id: Scalars['Int']['output']
  /** The mal id of the media */
  readonly idMal?: Maybe<Scalars['Int']['output']>
  /** If the media is intended only for 18+ adult audiences */
  readonly isAdult?: Maybe<Scalars['Boolean']['output']>
  /** If the media is marked as favourite by the current authenticated user */
  readonly isFavourite: Scalars['Boolean']['output']
  /** If the media is blocked from being added to favourites */
  readonly isFavouriteBlocked: Scalars['Boolean']['output']
  /** If the media is officially licensed or a self-published doujin release */
  readonly isLicensed?: Maybe<Scalars['Boolean']['output']>
  /** Locked media may not be added to lists our favorited. This may be due to the entry pending for deletion or other reasons. */
  readonly isLocked?: Maybe<Scalars['Boolean']['output']>
  /** If the media is blocked from being recommended to/from */
  readonly isRecommendationBlocked?: Maybe<Scalars['Boolean']['output']>
  /** If the media is blocked from being reviewed */
  readonly isReviewBlocked?: Maybe<Scalars['Boolean']['output']>
  /** Mean score of all the user's scores of the media */
  readonly meanScore?: Maybe<Scalars['Int']['output']>
  /** The authenticated user's media list entry for the media */
  readonly mediaListEntry?: Maybe<MediaList>
  /** Notes for site moderators */
  readonly modNotes?: Maybe<Scalars['String']['output']>
  /** The media's next episode airing schedule */
  readonly nextAiringEpisode?: Maybe<AiringSchedule>
  /** The number of users with the media on their list */
  readonly popularity?: Maybe<Scalars['Int']['output']>
  /** The ranking of the media in a particular time span and format compared to other media */
  readonly rankings?: Maybe<ReadonlyArray<Maybe<MediaRank>>>
  /** User recommendations for similar media */
  readonly recommendations?: Maybe<RecommendationConnection>
  /** Other media in the same or connecting franchise */
  readonly relations?: Maybe<MediaConnection>
  /** User reviews of the media */
  readonly reviews?: Maybe<ReviewConnection>
  /** The season the media was initially released in */
  readonly season?: Maybe<MediaSeason | `${MediaSeason}`>
  /**
   * The year & season the media was initially released in
   * @deprecated
   */
  readonly seasonInt?: Maybe<Scalars['Int']['output']>
  /** The season year the media was initially released in */
  readonly seasonYear?: Maybe<Scalars['Int']['output']>
  /** The url for the media page on the AniList website */
  readonly siteUrl?: Maybe<Scalars['String']['output']>
  /** Source type the media was adapted from. */
  readonly source?: Maybe<MediaSource | `${MediaSource}`>
  /** The staff who produced the media */
  readonly staff?: Maybe<StaffConnection>
  /** The first official release date of the media */
  readonly startDate?: Maybe<FuzzyDate>
  readonly stats?: Maybe<MediaStats>
  /** The current releasing status of the media */
  readonly status?: Maybe<MediaStatus | `${MediaStatus}`>
  /** Data and links to legal streaming episodes on external sites */
  readonly streamingEpisodes?: Maybe<ReadonlyArray<Maybe<MediaStreamingEpisode>>>
  /** The companies who produced the media */
  readonly studios?: Maybe<StudioConnection>
  /** Alternative titles of the media */
  readonly synonyms?: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>
  /** List of tags that describes elements and themes of the media */
  readonly tags?: Maybe<ReadonlyArray<Maybe<MediaTag>>>
  /** The official titles of the media in various languages */
  readonly title?: Maybe<MediaTitle>
  /** Media trailer or advertisement */
  readonly trailer?: Maybe<MediaTrailer>
  /** The amount of related activity in the past hour */
  readonly trending?: Maybe<Scalars['Int']['output']>
  /** The media's daily trend stats */
  readonly trends?: Maybe<MediaTrendConnection>
  /** The type of the media; anime or manga */
  readonly type?: Maybe<MediaType | `${MediaType}`>
  /** When the media's data was last updated */
  readonly updatedAt?: Maybe<Scalars['Int']['output']>
  /** The amount of volumes the manga has when complete */
  readonly volumes?: Maybe<Scalars['Int']['output']>
}

/** Anime or Manga */
export type MediaAiringScheduleArgs = {
  notYetAired?: InputMaybe<Scalars['Boolean']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  perPage?: InputMaybe<Scalars['Int']['input']>
}

/** Anime or Manga */
export type MediaCharactersArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
  perPage?: InputMaybe<Scalars['Int']['input']>
  role?: InputMaybe<CharacterRole>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<CharacterSort>>>
}

/** Anime or Manga */
export type MediaDescriptionArgs = {
  asHtml?: InputMaybe<Scalars['Boolean']['input']>
}

/** Anime or Manga */
export type MediaRecommendationsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
  perPage?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<RecommendationSort>>>
}

/** Anime or Manga */
export type MediaReviewsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  perPage?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<ReviewSort>>>
}

/** Anime or Manga */
export type MediaSourceArgs = {
  version?: InputMaybe<Scalars['Int']['input']>
}

/** Anime or Manga */
export type MediaStaffArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
  perPage?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<StaffSort>>>
}

/** Anime or Manga */
export type MediaStatusArgs = {
  version?: InputMaybe<Scalars['Int']['input']>
}

/** Anime or Manga */
export type MediaStudiosArgs = {
  isMain?: InputMaybe<Scalars['Boolean']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<StudioSort>>>
}

/** Anime or Manga */
export type MediaTrendsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
  perPage?: InputMaybe<Scalars['Int']['input']>
  releasing?: InputMaybe<Scalars['Boolean']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<MediaTrendSort>>>
}

/** Internal - Media characters separated */
export type MediaCharacter = {
  readonly __typename?: 'MediaCharacter'
  /** The characters in the media voiced by the parent actor */
  readonly character?: Maybe<Character>
  /** Media specific character name */
  readonly characterName?: Maybe<Scalars['String']['output']>
  readonly dubGroup?: Maybe<Scalars['String']['output']>
  /** The id of the connection */
  readonly id?: Maybe<Scalars['Int']['output']>
  /** The characters role in the media */
  readonly role?: Maybe<CharacterRole | `${CharacterRole}`>
  readonly roleNotes?: Maybe<Scalars['String']['output']>
  /** The voice actor of the character */
  readonly voiceActor?: Maybe<Staff>
}

export type MediaConnection = {
  readonly __typename?: 'MediaConnection'
  readonly edges?: Maybe<ReadonlyArray<Maybe<MediaEdge>>>
  readonly nodes?: Maybe<ReadonlyArray<Maybe<Media>>>
  /** The pagination information */
  readonly pageInfo?: Maybe<PageInfo>
}

export type MediaCoverImage = {
  readonly __typename?: 'MediaCoverImage'
  /** Average #hex color of cover image */
  readonly color?: Maybe<Scalars['String']['output']>
  /** The cover image url of the media at its largest size. If this size isn't available, large will be provided instead. */
  readonly extraLarge?: Maybe<Scalars['String']['output']>
  /** The cover image url of the media at a large size */
  readonly large?: Maybe<Scalars['String']['output']>
  /** The cover image url of the media at medium size */
  readonly medium?: Maybe<Scalars['String']['output']>
}

/** Notification for when a media entry's data was changed in a significant way impacting users' list tracking */
export type MediaDataChangeNotification = {
  readonly __typename?: 'MediaDataChangeNotification'
  /** The reason for the media data change */
  readonly context?: Maybe<Scalars['String']['output']>
  /** The time the notification was created at */
  readonly createdAt?: Maybe<Scalars['Int']['output']>
  /** The id of the Notification */
  readonly id: Scalars['Int']['output']
  /** The media that received data changes */
  readonly media?: Maybe<Media>
  /** The id of the media that received data changes */
  readonly mediaId: Scalars['Int']['output']
  /** The reason for the media data change */
  readonly reason?: Maybe<Scalars['String']['output']>
  /** The type of notification */
  readonly type?: Maybe<NotificationType | `${NotificationType}`>
}

/** Notification for when a media tracked in a user's list is deleted from the site */
export type MediaDeletionNotification = {
  readonly __typename?: 'MediaDeletionNotification'
  /** The reason for the media deletion */
  readonly context?: Maybe<Scalars['String']['output']>
  /** The time the notification was created at */
  readonly createdAt?: Maybe<Scalars['Int']['output']>
  /** The title of the deleted media */
  readonly deletedMediaTitle?: Maybe<Scalars['String']['output']>
  /** The id of the Notification */
  readonly id: Scalars['Int']['output']
  /** The reason for the media deletion */
  readonly reason?: Maybe<Scalars['String']['output']>
  /** The type of notification */
  readonly type?: Maybe<NotificationType | `${NotificationType}`>
}

/** Media connection edge */
export type MediaEdge = {
  readonly __typename?: 'MediaEdge'
  /** Media specific character name */
  readonly characterName?: Maybe<Scalars['String']['output']>
  /** The characters role in the media */
  readonly characterRole?: Maybe<CharacterRole | `${CharacterRole}`>
  /** The characters in the media voiced by the parent actor */
  readonly characters?: Maybe<ReadonlyArray<Maybe<Character>>>
  /** Used for grouping roles where multiple dubs exist for the same language. Either dubbing company name or language variant. */
  readonly dubGroup?: Maybe<Scalars['String']['output']>
  /** The order the media should be displayed from the users favourites */
  readonly favouriteOrder?: Maybe<Scalars['Int']['output']>
  /** The id of the connection */
  readonly id?: Maybe<Scalars['Int']['output']>
  /** If the studio is the main animation studio of the media (For Studio->MediaConnection field only) */
  readonly isMainStudio: Scalars['Boolean']['output']
  readonly node?: Maybe<Media>
  /** The type of relation to the parent model */
  readonly relationType?: Maybe<MediaRelation | `${MediaRelation}`>
  /** Notes regarding the VA's role for the character */
  readonly roleNotes?: Maybe<Scalars['String']['output']>
  /** The role of the staff member in the production of the media */
  readonly staffRole?: Maybe<Scalars['String']['output']>
  /** The voice actors of the character with role date */
  readonly voiceActorRoles?: Maybe<ReadonlyArray<Maybe<StaffRoleType>>>
  /** The voice actors of the character */
  readonly voiceActors?: Maybe<ReadonlyArray<Maybe<Staff>>>
}

/** Media connection edge */
export type MediaEdgeRelationTypeArgs = {
  version?: InputMaybe<Scalars['Int']['input']>
}

/** Media connection edge */
export type MediaEdgeVoiceActorRolesArgs = {
  language?: InputMaybe<StaffLanguage>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<StaffSort>>>
}

/** Media connection edge */
export type MediaEdgeVoiceActorsArgs = {
  language?: InputMaybe<StaffLanguage>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<StaffSort>>>
}

/** An external link to another site related to the media or staff member */
export type MediaExternalLink = {
  readonly __typename?: 'MediaExternalLink'
  readonly color?: Maybe<Scalars['String']['output']>
  /** The icon image url of the site. Not available for all links. Transparent PNG 64x64 */
  readonly icon?: Maybe<Scalars['String']['output']>
  /** The id of the external link */
  readonly id: Scalars['Int']['output']
  readonly isDisabled?: Maybe<Scalars['Boolean']['output']>
  /** Language the site content is in. See Staff language field for values. */
  readonly language?: Maybe<Scalars['String']['output']>
  readonly notes?: Maybe<Scalars['String']['output']>
  /** The links website site name */
  readonly site: Scalars['String']['output']
  /** The links website site id */
  readonly siteId?: Maybe<Scalars['Int']['output']>
  readonly type?: Maybe<ExternalLinkType | `${ExternalLinkType}`>
  /** The url of the external link or base url of link source */
  readonly url?: Maybe<Scalars['String']['output']>
}

/** An external link to another site related to the media */
export type MediaExternalLinkInput = {
  /** The id of the external link */
  readonly id: Scalars['Int']['input']
  /** The site location of the external link */
  readonly site: Scalars['String']['input']
  /** The url of the external link */
  readonly url: Scalars['String']['input']
}

/** The format the media was released in */
export type MediaFormat =
  /** Professionally published manga with more than one chapter */
  | 'MANGA'
  /** Anime movies with a theatrical release */
  | 'MOVIE'
  /** Short anime released as a music video */
  | 'MUSIC'
  /** Written books released as a series of light novels */
  | 'NOVEL'
  /** (Original Net Animation) Anime that have been originally released online or are only available through streaming services. */
  | 'ONA'
  /** Manga with just one chapter */
  | 'ONE_SHOT'
  /** (Original Video Animation) Anime that have been released directly on DVD/Blu-ray without originally going through a theatrical release or television broadcast */
  | 'OVA'
  /** Special episodes that have been included in DVD/Blu-ray releases, picture dramas, pilots, etc */
  | 'SPECIAL'
  /** Anime broadcast on television */
  | 'TV'
  /** Anime which are under 15 minutes in length and broadcast on television */
  | 'TV_SHORT'

/** List of anime or manga */
export type MediaList = {
  readonly __typename?: 'MediaList'
  /** Map of advanced scores with name keys */
  readonly advancedScores?: Maybe<Scalars['Json']['output']>
  /** When the entry was completed by the user */
  readonly completedAt?: Maybe<FuzzyDate>
  /** When the entry data was created */
  readonly createdAt?: Maybe<Scalars['Int']['output']>
  /** Map of booleans for which custom lists the entry are in */
  readonly customLists?: Maybe<Scalars['Json']['output']>
  /** If the entry shown be hidden from non-custom lists */
  readonly hiddenFromStatusLists?: Maybe<Scalars['Boolean']['output']>
  /** The id of the list entry */
  readonly id: Scalars['Int']['output']
  readonly media?: Maybe<Media>
  /** The id of the media */
  readonly mediaId: Scalars['Int']['output']
  /** Text notes */
  readonly notes?: Maybe<Scalars['String']['output']>
  /** Priority of planning */
  readonly priority?: Maybe<Scalars['Int']['output']>
  /** If the entry should only be visible to authenticated user */
  readonly private?: Maybe<Scalars['Boolean']['output']>
  /** The amount of episodes/chapters consumed by the user */
  readonly progress?: Maybe<Scalars['Int']['output']>
  /** The amount of volumes read by the user */
  readonly progressVolumes?: Maybe<Scalars['Int']['output']>
  /** The amount of times the user has rewatched/read the media */
  readonly repeat?: Maybe<Scalars['Int']['output']>
  /** The score of the entry */
  readonly score?: Maybe<Scalars['Float']['output']>
  /** When the entry was started by the user */
  readonly startedAt?: Maybe<FuzzyDate>
  /** The watching/reading status */
  readonly status?: Maybe<MediaListStatus | `${MediaListStatus}`>
  /** When the entry data was last updated */
  readonly updatedAt?: Maybe<Scalars['Int']['output']>
  readonly user?: Maybe<User>
  /** The id of the user owner of the list entry */
  readonly userId: Scalars['Int']['output']
}

/** List of anime or manga */
export type MediaListCustomListsArgs = {
  asArray?: InputMaybe<Scalars['Boolean']['input']>
}

/** List of anime or manga */
export type MediaListScoreArgs = {
  format?: InputMaybe<ScoreFormat>
}

/** List of anime or manga */
export type MediaListCollection = {
  readonly __typename?: 'MediaListCollection'
  /**
   * A map of media list entry arrays grouped by custom lists
   * @deprecated Not GraphQL spec compliant, use lists field instead.
   */
  readonly customLists?: Maybe<ReadonlyArray<Maybe<ReadonlyArray<Maybe<MediaList>>>>>
  /** If there is another chunk */
  readonly hasNextChunk?: Maybe<Scalars['Boolean']['output']>
  /** Grouped media list entries */
  readonly lists?: Maybe<ReadonlyArray<Maybe<MediaListGroup>>>
  /**
   * A map of media list entry arrays grouped by status
   * @deprecated Not GraphQL spec compliant, use lists field instead.
   */
  readonly statusLists?: Maybe<ReadonlyArray<Maybe<ReadonlyArray<Maybe<MediaList>>>>>
  /** The owner of the list */
  readonly user?: Maybe<User>
}

/** List of anime or manga */
export type MediaListCollectionCustomListsArgs = {
  asArray?: InputMaybe<Scalars['Boolean']['input']>
}

/** List of anime or manga */
export type MediaListCollectionStatusListsArgs = {
  asArray?: InputMaybe<Scalars['Boolean']['input']>
}

/** List group of anime or manga entries */
export type MediaListGroup = {
  readonly __typename?: 'MediaListGroup'
  /** Media list entries */
  readonly entries?: Maybe<ReadonlyArray<Maybe<MediaList>>>
  readonly isCustomList?: Maybe<Scalars['Boolean']['output']>
  readonly isSplitCompletedList?: Maybe<Scalars['Boolean']['output']>
  readonly name?: Maybe<Scalars['String']['output']>
  readonly status?: Maybe<MediaListStatus | `${MediaListStatus}`>
}

/** A user's list options */
export type MediaListOptions = {
  readonly __typename?: 'MediaListOptions'
  /** The user's anime list options */
  readonly animeList?: Maybe<MediaListTypeOptions>
  /** The user's manga list options */
  readonly mangaList?: Maybe<MediaListTypeOptions>
  /** The default order list rows should be displayed in */
  readonly rowOrder?: Maybe<Scalars['String']['output']>
  /** The score format the user is using for media lists */
  readonly scoreFormat?: Maybe<ScoreFormat | `${ScoreFormat}`>
  /**
   * The list theme options for both lists
   * @deprecated No longer used
   */
  readonly sharedTheme?: Maybe<Scalars['Json']['output']>
  /**
   * If the shared theme should be used instead of the individual list themes
   * @deprecated No longer used
   */
  readonly sharedThemeEnabled?: Maybe<Scalars['Boolean']['output']>
  /** @deprecated No longer used */
  readonly useLegacyLists?: Maybe<Scalars['Boolean']['output']>
}

/** A user's list options for anime or manga lists */
export type MediaListOptionsInput = {
  /** The names of the user's advanced scoring sections */
  readonly advancedScoring?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>
  /** If advanced scoring is enabled */
  readonly advancedScoringEnabled?: InputMaybe<Scalars['Boolean']['input']>
  /** The names of the user's custom lists */
  readonly customLists?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>
  /** The order each list should be displayed in */
  readonly sectionOrder?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>
  /** If the completed sections of the list should be separated by format */
  readonly splitCompletedSectionByFormat?: InputMaybe<Scalars['Boolean']['input']>
  /** list theme */
  readonly theme?: InputMaybe<Scalars['String']['input']>
}

/** Media list sort enums */
export type MediaListSort =
  | 'ADDED_TIME'
  | 'ADDED_TIME_DESC'
  | 'FINISHED_ON'
  | 'FINISHED_ON_DESC'
  | 'MEDIA_ID'
  | 'MEDIA_ID_DESC'
  | 'MEDIA_POPULARITY'
  | 'MEDIA_POPULARITY_DESC'
  | 'MEDIA_TITLE_ENGLISH'
  | 'MEDIA_TITLE_ENGLISH_DESC'
  | 'MEDIA_TITLE_NATIVE'
  | 'MEDIA_TITLE_NATIVE_DESC'
  | 'MEDIA_TITLE_ROMAJI'
  | 'MEDIA_TITLE_ROMAJI_DESC'
  | 'PRIORITY'
  | 'PRIORITY_DESC'
  | 'PROGRESS'
  | 'PROGRESS_DESC'
  | 'PROGRESS_VOLUMES'
  | 'PROGRESS_VOLUMES_DESC'
  | 'REPEAT'
  | 'REPEAT_DESC'
  | 'SCORE'
  | 'SCORE_DESC'
  | 'STARTED_ON'
  | 'STARTED_ON_DESC'
  | 'STATUS'
  | 'STATUS_DESC'
  | 'UPDATED_TIME'
  | 'UPDATED_TIME_DESC'

/** Media list watching/reading status enum. */
export type MediaListStatus =
  /** Finished watching/reading */
  | 'COMPLETED'
  /** Currently watching/reading */
  | 'CURRENT'
  /** Stopped watching/reading before completing */
  | 'DROPPED'
  /** Paused watching/reading */
  | 'PAUSED'
  /** Planning to watch/read */
  | 'PLANNING'
  /** Re-watching/reading */
  | 'REPEATING'

/** A user's list options for anime or manga lists */
export type MediaListTypeOptions = {
  readonly __typename?: 'MediaListTypeOptions'
  /** The names of the user's advanced scoring sections */
  readonly advancedScoring?: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>
  /** If advanced scoring is enabled */
  readonly advancedScoringEnabled?: Maybe<Scalars['Boolean']['output']>
  /** The names of the user's custom lists */
  readonly customLists?: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>
  /** The order each list should be displayed in */
  readonly sectionOrder?: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>
  /** If the completed sections of the list should be separated by format */
  readonly splitCompletedSectionByFormat?: Maybe<Scalars['Boolean']['output']>
  /**
   * The list theme options
   * @deprecated This field has not yet been fully implemented and may change without warning
   */
  readonly theme?: Maybe<Scalars['Json']['output']>
}

/** Notification for when a media entry is merged into another for a user who had it on their list */
export type MediaMergeNotification = {
  readonly __typename?: 'MediaMergeNotification'
  /** The reason for the media data change */
  readonly context?: Maybe<Scalars['String']['output']>
  /** The time the notification was created at */
  readonly createdAt?: Maybe<Scalars['Int']['output']>
  /** The title of the deleted media */
  readonly deletedMediaTitles?: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>
  /** The id of the Notification */
  readonly id: Scalars['Int']['output']
  /** The media that was merged into */
  readonly media?: Maybe<Media>
  /** The id of the media that was merged into */
  readonly mediaId: Scalars['Int']['output']
  /** The reason for the media merge */
  readonly reason?: Maybe<Scalars['String']['output']>
  /** The type of notification */
  readonly type?: Maybe<NotificationType | `${NotificationType}`>
}

/** The ranking of a media in a particular time span and format compared to other media */
export type MediaRank = {
  readonly __typename?: 'MediaRank'
  /** If the ranking is based on all time instead of a season/year */
  readonly allTime?: Maybe<Scalars['Boolean']['output']>
  /** String that gives context to the ranking type and time span */
  readonly context: Scalars['String']['output']
  /** The format the media is ranked within */
  readonly format: MediaFormat | `${MediaFormat}`
  /** The id of the rank */
  readonly id: Scalars['Int']['output']
  /** The numerical rank of the media */
  readonly rank: Scalars['Int']['output']
  /** The season the media is ranked within */
  readonly season?: Maybe<MediaSeason | `${MediaSeason}`>
  /** The type of ranking */
  readonly type: MediaRankType | `${MediaRankType}`
  /** The year the media is ranked within */
  readonly year?: Maybe<Scalars['Int']['output']>
}

/** The type of ranking */
export type MediaRankType =
  /** Ranking is based on the media's popularity */
  | 'POPULAR'
  /** Ranking is based on the media's ratings/score */
  | 'RATED'

/** Type of relation media has to its parent. */
export type MediaRelation =
  /** An adaption of this media into a different format */
  | 'ADAPTATION'
  /** An alternative version of the same media */
  | 'ALTERNATIVE'
  /** Shares at least 1 character */
  | 'CHARACTER'
  /** Version 2 only. */
  | 'COMPILATION'
  /** Version 2 only. */
  | 'CONTAINS'
  /** Other */
  | 'OTHER'
  /** The media a side story is from */
  | 'PARENT'
  /** Released before the relation */
  | 'PREQUEL'
  /** Released after the relation */
  | 'SEQUEL'
  /** A side story of the parent media */
  | 'SIDE_STORY'
  /** Version 2 only. The source material the media was adapted from */
  | 'SOURCE'
  /** An alternative version of the media with a different primary focus */
  | 'SPIN_OFF'
  /** A shortened and summarized version */
  | 'SUMMARY'

export type MediaSeason =
  /** Months September to November */
  | 'FALL'
  /** Months March to May */
  | 'SPRING'
  /** Months June to August */
  | 'SUMMER'
  /** Months December to February */
  | 'WINTER'

/** Media sort enums */
export type MediaSort =
  | 'CHAPTERS'
  | 'CHAPTERS_DESC'
  | 'DURATION'
  | 'DURATION_DESC'
  | 'END_DATE'
  | 'END_DATE_DESC'
  | 'EPISODES'
  | 'EPISODES_DESC'
  | 'FAVOURITES'
  | 'FAVOURITES_DESC'
  | 'FORMAT'
  | 'FORMAT_DESC'
  | 'ID'
  | 'ID_DESC'
  | 'POPULARITY'
  | 'POPULARITY_DESC'
  | 'SCORE'
  | 'SCORE_DESC'
  | 'SEARCH_MATCH'
  | 'START_DATE'
  | 'START_DATE_DESC'
  | 'STATUS'
  | 'STATUS_DESC'
  | 'TITLE_ENGLISH'
  | 'TITLE_ENGLISH_DESC'
  | 'TITLE_NATIVE'
  | 'TITLE_NATIVE_DESC'
  | 'TITLE_ROMAJI'
  | 'TITLE_ROMAJI_DESC'
  | 'TRENDING'
  | 'TRENDING_DESC'
  | 'TYPE'
  | 'TYPE_DESC'
  | 'UPDATED_AT'
  | 'UPDATED_AT_DESC'
  | 'VOLUMES'
  | 'VOLUMES_DESC'

/** Source type the media was adapted from */
export type MediaSource =
  /** Version 2+ only. Japanese Anime */
  | 'ANIME'
  /** Version 3 only. Comics excluding manga */
  | 'COMIC'
  /** Version 2+ only. Self-published works */
  | 'DOUJINSHI'
  /** Version 3 only. Games excluding video games */
  | 'GAME'
  /** Written work published in volumes */
  | 'LIGHT_NOVEL'
  /** Version 3 only. Live action media such as movies or TV show */
  | 'LIVE_ACTION'
  /** Asian comic book */
  | 'MANGA'
  /** Version 3 only. Multimedia project */
  | 'MULTIMEDIA_PROJECT'
  /** Version 2+ only. Written works not published in volumes */
  | 'NOVEL'
  /** An original production not based of another work */
  | 'ORIGINAL'
  /** Other */
  | 'OTHER'
  /** Version 3 only. Picture book */
  | 'PICTURE_BOOK'
  /** Video game */
  | 'VIDEO_GAME'
  /** Video game driven primary by text and narrative */
  | 'VISUAL_NOVEL'
  /** Version 3 only. Written works published online */
  | 'WEB_NOVEL'

/** A media's statistics */
export type MediaStats = {
  readonly __typename?: 'MediaStats'
  /** @deprecated Replaced by MediaTrends */
  readonly airingProgression?: Maybe<ReadonlyArray<Maybe<AiringProgression>>>
  readonly scoreDistribution?: Maybe<ReadonlyArray<Maybe<ScoreDistribution>>>
  readonly statusDistribution?: Maybe<ReadonlyArray<Maybe<StatusDistribution>>>
}

/** The current releasing status of the media */
export type MediaStatus =
  /** Ended before the work could be finished */
  | 'CANCELLED'
  /** Has completed and is no longer being released */
  | 'FINISHED'
  /** Version 2 only. Is currently paused from releasing and will resume at a later date */
  | 'HIATUS'
  /** To be released at a later date */
  | 'NOT_YET_RELEASED'
  /** Currently releasing */
  | 'RELEASING'

/** Data and links to legal streaming episodes on external sites */
export type MediaStreamingEpisode = {
  readonly __typename?: 'MediaStreamingEpisode'
  /** The site location of the streaming episodes */
  readonly site?: Maybe<Scalars['String']['output']>
  /** Url of episode image thumbnail */
  readonly thumbnail?: Maybe<Scalars['String']['output']>
  /** Title of the episode */
  readonly title?: Maybe<Scalars['String']['output']>
  /** The url of the episode */
  readonly url?: Maybe<Scalars['String']['output']>
}

/** Media submission */
export type MediaSubmission = {
  readonly __typename?: 'MediaSubmission'
  /** Data Mod assigned to handle the submission */
  readonly assignee?: Maybe<User>
  readonly changes?: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>
  readonly characters?: Maybe<ReadonlyArray<Maybe<MediaSubmissionComparison>>>
  readonly createdAt?: Maybe<Scalars['Int']['output']>
  readonly externalLinks?: Maybe<ReadonlyArray<Maybe<MediaSubmissionComparison>>>
  /** The id of the submission */
  readonly id: Scalars['Int']['output']
  /** Whether the submission is locked */
  readonly locked?: Maybe<Scalars['Boolean']['output']>
  readonly media?: Maybe<Media>
  readonly notes?: Maybe<Scalars['String']['output']>
  readonly relations?: Maybe<ReadonlyArray<Maybe<MediaEdge>>>
  readonly source?: Maybe<Scalars['String']['output']>
  readonly staff?: Maybe<ReadonlyArray<Maybe<MediaSubmissionComparison>>>
  /** Status of the submission */
  readonly status?: Maybe<SubmissionStatus | `${SubmissionStatus}`>
  readonly studios?: Maybe<ReadonlyArray<Maybe<MediaSubmissionComparison>>>
  readonly submission?: Maybe<Media>
  /** User submitter of the submission */
  readonly submitter?: Maybe<User>
  readonly submitterStats?: Maybe<Scalars['Json']['output']>
}

/** Media submission with comparison to current data */
export type MediaSubmissionComparison = {
  readonly __typename?: 'MediaSubmissionComparison'
  readonly character?: Maybe<MediaCharacter>
  readonly externalLink?: Maybe<MediaExternalLink>
  readonly staff?: Maybe<StaffEdge>
  readonly studio?: Maybe<StudioEdge>
  readonly submission?: Maybe<MediaSubmissionEdge>
}

export type MediaSubmissionEdge = {
  readonly __typename?: 'MediaSubmissionEdge'
  readonly character?: Maybe<Character>
  readonly characterName?: Maybe<Scalars['String']['output']>
  readonly characterRole?: Maybe<CharacterRole | `${CharacterRole}`>
  readonly characterSubmission?: Maybe<Character>
  readonly dubGroup?: Maybe<Scalars['String']['output']>
  readonly externalLink?: Maybe<MediaExternalLink>
  /** The id of the direct submission */
  readonly id?: Maybe<Scalars['Int']['output']>
  readonly isMain?: Maybe<Scalars['Boolean']['output']>
  readonly media?: Maybe<Media>
  readonly roleNotes?: Maybe<Scalars['String']['output']>
  readonly staff?: Maybe<Staff>
  readonly staffRole?: Maybe<Scalars['String']['output']>
  readonly staffSubmission?: Maybe<Staff>
  readonly studio?: Maybe<Studio>
  readonly voiceActor?: Maybe<Staff>
  readonly voiceActorSubmission?: Maybe<Staff>
}

/** Notification for when a media submission is accepted, partially accepted, or rejected */
export type MediaSubmissionUpdateNotification = {
  readonly __typename?: 'MediaSubmissionUpdateNotification'
  /** The notification context text */
  readonly contexts?: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>
  /** The time the notification was created at */
  readonly createdAt?: Maybe<Scalars['Int']['output']>
  /** The id of the Notification */
  readonly id: Scalars['Int']['output']
  /** The media that was created or modified. If this submission was to create a new media and it was rejected, this will be null. */
  readonly media?: Maybe<Media>
  /** The notes of the submission */
  readonly notes?: Maybe<Scalars['String']['output']>
  /** The status of the submission */
  readonly status?: Maybe<Scalars['String']['output']>
  /** The title of the media that was submitted. If this submission was to edit an existing media, this will be null. */
  readonly submittedTitle?: Maybe<Scalars['String']['output']>
  /** The type of notification */
  readonly type?: Maybe<NotificationType | `${NotificationType}`>
}

/** A tag that describes a theme or element of the media */
export type MediaTag = {
  readonly __typename?: 'MediaTag'
  /** The categories of tags this tag belongs to */
  readonly category?: Maybe<Scalars['String']['output']>
  /** A general description of the tag */
  readonly description?: Maybe<Scalars['String']['output']>
  /** The id of the tag */
  readonly id: Scalars['Int']['output']
  /** If the tag is only for adult 18+ media */
  readonly isAdult?: Maybe<Scalars['Boolean']['output']>
  /** If the tag could be a spoiler for any media */
  readonly isGeneralSpoiler?: Maybe<Scalars['Boolean']['output']>
  /** If the tag is a spoiler for this media */
  readonly isMediaSpoiler?: Maybe<Scalars['Boolean']['output']>
  /** The name of the tag */
  readonly name: Scalars['String']['output']
  /** The relevance ranking of the tag out of the 100 for this media */
  readonly rank?: Maybe<Scalars['Int']['output']>
  /** The user who submitted the tag */
  readonly userId?: Maybe<Scalars['Int']['output']>
}

/** The official titles of the media in various languages */
export type MediaTitle = {
  readonly __typename?: 'MediaTitle'
  /** The official english title */
  readonly english?: Maybe<Scalars['String']['output']>
  /** Official title in it's native language */
  readonly native?: Maybe<Scalars['String']['output']>
  /** The romanization of the native language title */
  readonly romaji?: Maybe<Scalars['String']['output']>
  /** The currently authenticated users preferred title language. Default romaji for non-authenticated */
  readonly userPreferred?: Maybe<Scalars['String']['output']>
}

/** The official titles of the media in various languages */
export type MediaTitleEnglishArgs = {
  stylised?: InputMaybe<Scalars['Boolean']['input']>
}

/** The official titles of the media in various languages */
export type MediaTitleNativeArgs = {
  stylised?: InputMaybe<Scalars['Boolean']['input']>
}

/** The official titles of the media in various languages */
export type MediaTitleRomajiArgs = {
  stylised?: InputMaybe<Scalars['Boolean']['input']>
}

/** The official titles of the media in various languages */
export type MediaTitleInput = {
  /** The official english title */
  readonly english?: InputMaybe<Scalars['String']['input']>
  /** Official title in it's native language */
  readonly native?: InputMaybe<Scalars['String']['input']>
  /** The romanization of the native language title */
  readonly romaji?: InputMaybe<Scalars['String']['input']>
}

/** Media trailer or advertisement */
export type MediaTrailer = {
  readonly __typename?: 'MediaTrailer'
  /** The trailer video id */
  readonly id?: Maybe<Scalars['String']['output']>
  /** The site the video is hosted by (Currently either youtube or dailymotion) */
  readonly site?: Maybe<Scalars['String']['output']>
  /** The url for the thumbnail image of the video */
  readonly thumbnail?: Maybe<Scalars['String']['output']>
}

/** Daily media statistics */
export type MediaTrend = {
  readonly __typename?: 'MediaTrend'
  /** A weighted average score of all the user's scores of the media */
  readonly averageScore?: Maybe<Scalars['Int']['output']>
  /** The day the data was recorded (timestamp) */
  readonly date: Scalars['Int']['output']
  /** The episode number of the anime released on this day */
  readonly episode?: Maybe<Scalars['Int']['output']>
  /** The number of users with watching/reading the media */
  readonly inProgress?: Maybe<Scalars['Int']['output']>
  /** The related media */
  readonly media?: Maybe<Media>
  /** The id of the tag */
  readonly mediaId: Scalars['Int']['output']
  /** The number of users with the media on their list */
  readonly popularity?: Maybe<Scalars['Int']['output']>
  /** If the media was being released at this time */
  readonly releasing: Scalars['Boolean']['output']
  /** The amount of media activity on the day */
  readonly trending: Scalars['Int']['output']
}

export type MediaTrendConnection = {
  readonly __typename?: 'MediaTrendConnection'
  readonly edges?: Maybe<ReadonlyArray<Maybe<MediaTrendEdge>>>
  readonly nodes?: Maybe<ReadonlyArray<Maybe<MediaTrend>>>
  /** The pagination information */
  readonly pageInfo?: Maybe<PageInfo>
}

/** Media trend connection edge */
export type MediaTrendEdge = {
  readonly __typename?: 'MediaTrendEdge'
  readonly node?: Maybe<MediaTrend>
}

/** Media trend sort enums */
export type MediaTrendSort =
  | 'DATE'
  | 'DATE_DESC'
  | 'EPISODE'
  | 'EPISODE_DESC'
  | 'ID'
  | 'ID_DESC'
  | 'MEDIA_ID'
  | 'MEDIA_ID_DESC'
  | 'POPULARITY'
  | 'POPULARITY_DESC'
  | 'SCORE'
  | 'SCORE_DESC'
  | 'TRENDING'
  | 'TRENDING_DESC'

/** Media type enum, anime or manga. */
export type MediaType =
  /** Japanese Anime */
  | 'ANIME'
  /** Asian comic */
  | 'MANGA'

/** User message activity */
export type MessageActivity = {
  readonly __typename?: 'MessageActivity'
  /** The time the activity was created at */
  readonly createdAt: Scalars['Int']['output']
  /** The id of the activity */
  readonly id: Scalars['Int']['output']
  /** If the currently authenticated user liked the activity */
  readonly isLiked?: Maybe<Scalars['Boolean']['output']>
  /** If the activity is locked and can receive replies */
  readonly isLocked?: Maybe<Scalars['Boolean']['output']>
  /** If the message is private and only viewable to the sender and recipients */
  readonly isPrivate?: Maybe<Scalars['Boolean']['output']>
  /** If the currently authenticated user is subscribed to the activity */
  readonly isSubscribed?: Maybe<Scalars['Boolean']['output']>
  /** The amount of likes the activity has */
  readonly likeCount: Scalars['Int']['output']
  /** The users who liked the activity */
  readonly likes?: Maybe<ReadonlyArray<Maybe<User>>>
  /** The message text (Markdown) */
  readonly message?: Maybe<Scalars['String']['output']>
  /** The user who sent the activity message */
  readonly messenger?: Maybe<User>
  /** The user id of the activity's sender */
  readonly messengerId?: Maybe<Scalars['Int']['output']>
  /** The user who the activity message was sent to */
  readonly recipient?: Maybe<User>
  /** The user id of the activity's recipient */
  readonly recipientId?: Maybe<Scalars['Int']['output']>
  /** The written replies to the activity */
  readonly replies?: Maybe<ReadonlyArray<Maybe<ActivityReply>>>
  /** The number of activity replies */
  readonly replyCount: Scalars['Int']['output']
  /** The url for the activity page on the AniList website */
  readonly siteUrl?: Maybe<Scalars['String']['output']>
  /** The type of the activity */
  readonly type?: Maybe<ActivityType | `${ActivityType}`>
}

/** User message activity */
export type MessageActivityMessageArgs = {
  asHtml?: InputMaybe<Scalars['Boolean']['input']>
}

export type ModAction = {
  readonly __typename?: 'ModAction'
  readonly createdAt: Scalars['Int']['output']
  readonly data?: Maybe<Scalars['String']['output']>
  /** The id of the action */
  readonly id: Scalars['Int']['output']
  readonly mod?: Maybe<User>
  readonly objectId?: Maybe<Scalars['Int']['output']>
  readonly objectType?: Maybe<Scalars['String']['output']>
  readonly type?: Maybe<ModActionType | `${ModActionType}`>
  readonly user?: Maybe<User>
}

export type ModActionType =
  | 'ANON'
  | 'BAN'
  | 'DELETE'
  | 'EDIT'
  | 'EXPIRE'
  | 'NOTE'
  | 'REPORT'
  | 'RESET'

/** Mod role enums */
export type ModRole =
  /** An AniList administrator */
  | 'ADMIN'
  /** An anime data moderator */
  | 'ANIME_DATA'
  /** A character data moderator */
  | 'CHARACTER_DATA'
  /** A community moderator */
  | 'COMMUNITY'
  /** An AniList developer */
  | 'DEVELOPER'
  /** A discord community moderator */
  | 'DISCORD_COMMUNITY'
  /** A lead anime data moderator */
  | 'LEAD_ANIME_DATA'
  /** A lead community moderator */
  | 'LEAD_COMMUNITY'
  /** A head developer of AniList */
  | 'LEAD_DEVELOPER'
  /** A lead manga data moderator */
  | 'LEAD_MANGA_DATA'
  /** A lead social media moderator */
  | 'LEAD_SOCIAL_MEDIA'
  /** A manga data moderator */
  | 'MANGA_DATA'
  /** A retired moderator */
  | 'RETIRED'
  /** A social media moderator */
  | 'SOCIAL_MEDIA'
  /** A staff data moderator */
  | 'STAFF_DATA'

export type Mutation = {
  readonly __typename?: 'Mutation'
  /** Delete an activity item of the authenticated users */
  readonly DeleteActivity?: Maybe<Deleted>
  /** Delete an activity reply of the authenticated users */
  readonly DeleteActivityReply?: Maybe<Deleted>
  /** Delete a custom list and remove the list entries from it */
  readonly DeleteCustomList?: Maybe<Deleted>
  /** Delete a media list entry */
  readonly DeleteMediaListEntry?: Maybe<Deleted>
  /** Delete a review */
  readonly DeleteReview?: Maybe<Deleted>
  /** Delete a thread */
  readonly DeleteThread?: Maybe<Deleted>
  /** Delete a thread comment */
  readonly DeleteThreadComment?: Maybe<Deleted>
  /** Rate a review */
  readonly RateReview?: Maybe<Review>
  /** Create or update an activity reply */
  readonly SaveActivityReply?: Maybe<ActivityReply>
  /** Update list activity (Mod Only) */
  readonly SaveListActivity?: Maybe<ListActivity>
  /** Create or update a media list entry */
  readonly SaveMediaListEntry?: Maybe<MediaList>
  /** Create or update message activity for the currently authenticated user */
  readonly SaveMessageActivity?: Maybe<MessageActivity>
  /** Recommendation a media */
  readonly SaveRecommendation?: Maybe<Recommendation>
  /** Create or update a review */
  readonly SaveReview?: Maybe<Review>
  /** Create or update text activity for the currently authenticated user */
  readonly SaveTextActivity?: Maybe<TextActivity>
  /** Create or update a forum thread */
  readonly SaveThread?: Maybe<Thread>
  /** Create or update a thread comment */
  readonly SaveThreadComment?: Maybe<ThreadComment>
  /** Toggle activity to be pinned to the top of the user's activity feed */
  readonly ToggleActivityPin?: Maybe<ActivityUnion>
  /** Toggle the subscription of an activity item */
  readonly ToggleActivitySubscription?: Maybe<ActivityUnion>
  /** Favourite or unfavourite an anime, manga, character, staff member, or studio */
  readonly ToggleFavourite?: Maybe<Favourites>
  /** Toggle the un/following of a user */
  readonly ToggleFollow?: Maybe<User>
  /**
   * Add or remove a like from a likeable type.
   *                           Returns all the users who liked the same model
   */
  readonly ToggleLike?: Maybe<ReadonlyArray<Maybe<User>>>
  /** Add or remove a like from a likeable type. */
  readonly ToggleLikeV2?: Maybe<LikeableUnion>
  /** Toggle the subscription of a forum thread */
  readonly ToggleThreadSubscription?: Maybe<Thread>
  readonly UpdateAniChartHighlights?: Maybe<Scalars['Json']['output']>
  readonly UpdateAniChartSettings?: Maybe<Scalars['Json']['output']>
  /** Update the order favourites are displayed in */
  readonly UpdateFavouriteOrder?: Maybe<Favourites>
  /** Update multiple media list entries to the same values */
  readonly UpdateMediaListEntries?: Maybe<ReadonlyArray<Maybe<MediaList>>>
  readonly UpdateUser?: Maybe<User>
}

export type MutationDeleteActivityArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
}

export type MutationDeleteActivityReplyArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
}

export type MutationDeleteCustomListArgs = {
  customList?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<MediaType>
}

export type MutationDeleteMediaListEntryArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
}

export type MutationDeleteReviewArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
}

export type MutationDeleteThreadArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
}

export type MutationDeleteThreadCommentArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
}

export type MutationRateReviewArgs = {
  rating?: InputMaybe<ReviewRating>
  reviewId?: InputMaybe<Scalars['Int']['input']>
}

export type MutationSaveActivityReplyArgs = {
  activityId?: InputMaybe<Scalars['Int']['input']>
  asMod?: InputMaybe<Scalars['Boolean']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
  text?: InputMaybe<Scalars['String']['input']>
}

export type MutationSaveListActivityArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
  locked?: InputMaybe<Scalars['Boolean']['input']>
}

export type MutationSaveMediaListEntryArgs = {
  advancedScores?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Float']['input']>>>
  completedAt?: InputMaybe<FuzzyDateInput>
  customLists?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>
  hiddenFromStatusLists?: InputMaybe<Scalars['Boolean']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
  mediaId?: InputMaybe<Scalars['Int']['input']>
  notes?: InputMaybe<Scalars['String']['input']>
  priority?: InputMaybe<Scalars['Int']['input']>
  private?: InputMaybe<Scalars['Boolean']['input']>
  progress?: InputMaybe<Scalars['Int']['input']>
  progressVolumes?: InputMaybe<Scalars['Int']['input']>
  repeat?: InputMaybe<Scalars['Int']['input']>
  score?: InputMaybe<Scalars['Float']['input']>
  scoreRaw?: InputMaybe<Scalars['Int']['input']>
  startedAt?: InputMaybe<FuzzyDateInput>
  status?: InputMaybe<MediaListStatus>
}

export type MutationSaveMessageActivityArgs = {
  asMod?: InputMaybe<Scalars['Boolean']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
  locked?: InputMaybe<Scalars['Boolean']['input']>
  message?: InputMaybe<Scalars['String']['input']>
  private?: InputMaybe<Scalars['Boolean']['input']>
  recipientId?: InputMaybe<Scalars['Int']['input']>
}

export type MutationSaveRecommendationArgs = {
  mediaId?: InputMaybe<Scalars['Int']['input']>
  mediaRecommendationId?: InputMaybe<Scalars['Int']['input']>
  rating?: InputMaybe<RecommendationRating>
}

export type MutationSaveReviewArgs = {
  body?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
  mediaId?: InputMaybe<Scalars['Int']['input']>
  private?: InputMaybe<Scalars['Boolean']['input']>
  score?: InputMaybe<Scalars['Int']['input']>
  summary?: InputMaybe<Scalars['String']['input']>
}

export type MutationSaveTextActivityArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
  locked?: InputMaybe<Scalars['Boolean']['input']>
  text?: InputMaybe<Scalars['String']['input']>
}

export type MutationSaveThreadArgs = {
  body?: InputMaybe<Scalars['String']['input']>
  categories?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  id?: InputMaybe<Scalars['Int']['input']>
  locked?: InputMaybe<Scalars['Boolean']['input']>
  mediaCategories?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  sticky?: InputMaybe<Scalars['Boolean']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type MutationSaveThreadCommentArgs = {
  comment?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
  locked?: InputMaybe<Scalars['Boolean']['input']>
  parentCommentId?: InputMaybe<Scalars['Int']['input']>
  threadId?: InputMaybe<Scalars['Int']['input']>
}

export type MutationToggleActivityPinArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
  pinned?: InputMaybe<Scalars['Boolean']['input']>
}

export type MutationToggleActivitySubscriptionArgs = {
  activityId?: InputMaybe<Scalars['Int']['input']>
  subscribe?: InputMaybe<Scalars['Boolean']['input']>
}

export type MutationToggleFavouriteArgs = {
  animeId?: InputMaybe<Scalars['Int']['input']>
  characterId?: InputMaybe<Scalars['Int']['input']>
  mangaId?: InputMaybe<Scalars['Int']['input']>
  staffId?: InputMaybe<Scalars['Int']['input']>
  studioId?: InputMaybe<Scalars['Int']['input']>
}

export type MutationToggleFollowArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>
}

export type MutationToggleLikeArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
  type?: InputMaybe<LikeableType>
}

export type MutationToggleLikeV2Args = {
  id?: InputMaybe<Scalars['Int']['input']>
  type?: InputMaybe<LikeableType>
}

export type MutationToggleThreadSubscriptionArgs = {
  subscribe?: InputMaybe<Scalars['Boolean']['input']>
  threadId?: InputMaybe<Scalars['Int']['input']>
}

export type MutationUpdateAniChartHighlightsArgs = {
  highlights?: InputMaybe<ReadonlyArray<InputMaybe<AniChartHighlightInput>>>
}

export type MutationUpdateAniChartSettingsArgs = {
  outgoingLinkProvider?: InputMaybe<Scalars['String']['input']>
  sort?: InputMaybe<Scalars['String']['input']>
  theme?: InputMaybe<Scalars['String']['input']>
  titleLanguage?: InputMaybe<Scalars['String']['input']>
}

export type MutationUpdateFavouriteOrderArgs = {
  animeIds?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  animeOrder?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  characterIds?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  characterOrder?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  mangaIds?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  mangaOrder?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  staffIds?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  staffOrder?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  studioIds?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  studioOrder?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
}

export type MutationUpdateMediaListEntriesArgs = {
  advancedScores?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Float']['input']>>>
  completedAt?: InputMaybe<FuzzyDateInput>
  hiddenFromStatusLists?: InputMaybe<Scalars['Boolean']['input']>
  ids?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  notes?: InputMaybe<Scalars['String']['input']>
  priority?: InputMaybe<Scalars['Int']['input']>
  private?: InputMaybe<Scalars['Boolean']['input']>
  progress?: InputMaybe<Scalars['Int']['input']>
  progressVolumes?: InputMaybe<Scalars['Int']['input']>
  repeat?: InputMaybe<Scalars['Int']['input']>
  score?: InputMaybe<Scalars['Float']['input']>
  scoreRaw?: InputMaybe<Scalars['Int']['input']>
  startedAt?: InputMaybe<FuzzyDateInput>
  status?: InputMaybe<MediaListStatus>
}

export type MutationUpdateUserArgs = {
  about?: InputMaybe<Scalars['String']['input']>
  activityMergeTime?: InputMaybe<Scalars['Int']['input']>
  airingNotifications?: InputMaybe<Scalars['Boolean']['input']>
  animeListOptions?: InputMaybe<MediaListOptionsInput>
  disabledListActivity?: InputMaybe<ReadonlyArray<InputMaybe<ListActivityOptionInput>>>
  displayAdultContent?: InputMaybe<Scalars['Boolean']['input']>
  donatorBadge?: InputMaybe<Scalars['String']['input']>
  mangaListOptions?: InputMaybe<MediaListOptionsInput>
  notificationOptions?: InputMaybe<ReadonlyArray<InputMaybe<NotificationOptionInput>>>
  profileColor?: InputMaybe<Scalars['String']['input']>
  restrictMessagesToFollowing?: InputMaybe<Scalars['Boolean']['input']>
  rowOrder?: InputMaybe<Scalars['String']['input']>
  scoreFormat?: InputMaybe<ScoreFormat>
  staffNameLanguage?: InputMaybe<UserStaffNameLanguage>
  timezone?: InputMaybe<Scalars['String']['input']>
  titleLanguage?: InputMaybe<UserTitleLanguage>
}

/** Notification option */
export type NotificationOption = {
  readonly __typename?: 'NotificationOption'
  /** Whether this type of notification is enabled */
  readonly enabled?: Maybe<Scalars['Boolean']['output']>
  /** The type of notification */
  readonly type?: Maybe<NotificationType | `${NotificationType}`>
}

/** Notification option input */
export type NotificationOptionInput = {
  /** Whether this type of notification is enabled */
  readonly enabled?: InputMaybe<Scalars['Boolean']['input']>
  /** The type of notification */
  readonly type?: InputMaybe<NotificationType | `${NotificationType}`>
}

/** Notification type enum */
export type NotificationType =
  /** A user has liked your activity */
  | 'ACTIVITY_LIKE'
  /** A user has mentioned you in their activity */
  | 'ACTIVITY_MENTION'
  /** A user has sent you message */
  | 'ACTIVITY_MESSAGE'
  /** A user has replied to your activity */
  | 'ACTIVITY_REPLY'
  /** A user has liked your activity reply */
  | 'ACTIVITY_REPLY_LIKE'
  /** A user has replied to activity you have also replied to */
  | 'ACTIVITY_REPLY_SUBSCRIBED'
  /** An anime you are currently watching has aired */
  | 'AIRING'
  /** A user's character submission has been accepted, partially accepted, or rejected */
  | 'CHARACTER_SUBMISSION_UPDATE'
  /** A user has followed you */
  | 'FOLLOWING'
  /** An anime or manga has had a data change that affects how a user may track it in their lists */
  | 'MEDIA_DATA_CHANGE'
  /** An anime or manga on the user's list has been deleted from the site */
  | 'MEDIA_DELETION'
  /** Anime or manga entries on the user's list have been merged into a single entry */
  | 'MEDIA_MERGE'
  /** A user's submission has been accepted, partially accepted, or rejected */
  | 'MEDIA_SUBMISSION_UPDATE'
  /** A new anime or manga has been added to the site where its related media is on the user's list */
  | 'RELATED_MEDIA_ADDITION'
  /** A user's staff submission has been accepted, partially accepted, or rejected */
  | 'STAFF_SUBMISSION_UPDATE'
  /** A user has liked your forum comment */
  | 'THREAD_COMMENT_LIKE'
  /** A user has mentioned you in a forum comment */
  | 'THREAD_COMMENT_MENTION'
  /** A user has replied to your forum comment */
  | 'THREAD_COMMENT_REPLY'
  /** A user has liked your forum thread */
  | 'THREAD_LIKE'
  /** A user has commented in one of your subscribed forum threads */
  | 'THREAD_SUBSCRIBED'

/** Notification union type */
export type NotificationUnion =
  | ActivityLikeNotification
  | ActivityMentionNotification
  | ActivityMessageNotification
  | ActivityReplyLikeNotification
  | ActivityReplyNotification
  | ActivityReplySubscribedNotification
  | AiringNotification
  | CharacterSubmissionUpdateNotification
  | FollowingNotification
  | MediaDataChangeNotification
  | MediaDeletionNotification
  | MediaMergeNotification
  | MediaSubmissionUpdateNotification
  | RelatedMediaAdditionNotification
  | StaffSubmissionUpdateNotification
  | ThreadCommentLikeNotification
  | ThreadCommentMentionNotification
  | ThreadCommentReplyNotification
  | ThreadCommentSubscribedNotification
  | ThreadLikeNotification

/** Page of data */
export type Page = {
  readonly __typename?: 'Page'
  readonly activities?: Maybe<ReadonlyArray<Maybe<ActivityUnion>>>
  readonly activityReplies?: Maybe<ReadonlyArray<Maybe<ActivityReply>>>
  readonly airingSchedules?: Maybe<ReadonlyArray<Maybe<AiringSchedule>>>
  readonly characters?: Maybe<ReadonlyArray<Maybe<Character>>>
  readonly followers?: Maybe<ReadonlyArray<Maybe<User>>>
  readonly following?: Maybe<ReadonlyArray<Maybe<User>>>
  readonly likes?: Maybe<ReadonlyArray<Maybe<User>>>
  readonly media?: Maybe<ReadonlyArray<Maybe<Media>>>
  readonly mediaList?: Maybe<ReadonlyArray<Maybe<MediaList>>>
  readonly mediaTrends?: Maybe<ReadonlyArray<Maybe<MediaTrend>>>
  readonly notifications?: Maybe<ReadonlyArray<Maybe<NotificationUnion>>>
  /** The pagination information */
  readonly pageInfo?: Maybe<PageInfo>
  readonly recommendations?: Maybe<ReadonlyArray<Maybe<Recommendation>>>
  readonly reviews?: Maybe<ReadonlyArray<Maybe<Review>>>
  readonly staff?: Maybe<ReadonlyArray<Maybe<Staff>>>
  readonly studios?: Maybe<ReadonlyArray<Maybe<Studio>>>
  readonly threadComments?: Maybe<ReadonlyArray<Maybe<ThreadComment>>>
  readonly threads?: Maybe<ReadonlyArray<Maybe<Thread>>>
  readonly users?: Maybe<ReadonlyArray<Maybe<User>>>
}

/** Page of data */
export type PageActivitiesArgs = {
  createdAt?: InputMaybe<Scalars['Int']['input']>
  createdAt_greater?: InputMaybe<Scalars['Int']['input']>
  createdAt_lesser?: InputMaybe<Scalars['Int']['input']>
  hasReplies?: InputMaybe<Scalars['Boolean']['input']>
  hasRepliesOrTypeText?: InputMaybe<Scalars['Boolean']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
  id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  id_not?: InputMaybe<Scalars['Int']['input']>
  id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  isFollowing?: InputMaybe<Scalars['Boolean']['input']>
  mediaId?: InputMaybe<Scalars['Int']['input']>
  mediaId_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  mediaId_not?: InputMaybe<Scalars['Int']['input']>
  mediaId_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  messengerId?: InputMaybe<Scalars['Int']['input']>
  messengerId_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  messengerId_not?: InputMaybe<Scalars['Int']['input']>
  messengerId_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<ActivitySort>>>
  type?: InputMaybe<ActivityType>
  type_in?: InputMaybe<ReadonlyArray<InputMaybe<ActivityType>>>
  type_not?: InputMaybe<ActivityType>
  type_not_in?: InputMaybe<ReadonlyArray<InputMaybe<ActivityType>>>
  userId?: InputMaybe<Scalars['Int']['input']>
  userId_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  userId_not?: InputMaybe<Scalars['Int']['input']>
  userId_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
}

/** Page of data */
export type PageActivityRepliesArgs = {
  activityId?: InputMaybe<Scalars['Int']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
}

/** Page of data */
export type PageAiringSchedulesArgs = {
  airingAt?: InputMaybe<Scalars['Int']['input']>
  airingAt_greater?: InputMaybe<Scalars['Int']['input']>
  airingAt_lesser?: InputMaybe<Scalars['Int']['input']>
  episode?: InputMaybe<Scalars['Int']['input']>
  episode_greater?: InputMaybe<Scalars['Int']['input']>
  episode_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  episode_lesser?: InputMaybe<Scalars['Int']['input']>
  episode_not?: InputMaybe<Scalars['Int']['input']>
  episode_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  id?: InputMaybe<Scalars['Int']['input']>
  id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  id_not?: InputMaybe<Scalars['Int']['input']>
  id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  mediaId?: InputMaybe<Scalars['Int']['input']>
  mediaId_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  mediaId_not?: InputMaybe<Scalars['Int']['input']>
  mediaId_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  notYetAired?: InputMaybe<Scalars['Boolean']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<AiringSort>>>
}

/** Page of data */
export type PageCharactersArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
  id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  id_not?: InputMaybe<Scalars['Int']['input']>
  id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  isBirthday?: InputMaybe<Scalars['Boolean']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<CharacterSort>>>
}

/** Page of data */
export type PageFollowersArgs = {
  sort?: InputMaybe<ReadonlyArray<InputMaybe<UserSort>>>
  userId: Scalars['Int']['input']
}

/** Page of data */
export type PageFollowingArgs = {
  sort?: InputMaybe<ReadonlyArray<InputMaybe<UserSort>>>
  userId: Scalars['Int']['input']
}

/** Page of data */
export type PageLikesArgs = {
  likeableId?: InputMaybe<Scalars['Int']['input']>
  type?: InputMaybe<LikeableType>
}

/** Page of data */
export type PageMediaArgs = {
  averageScore?: InputMaybe<Scalars['Int']['input']>
  averageScore_greater?: InputMaybe<Scalars['Int']['input']>
  averageScore_lesser?: InputMaybe<Scalars['Int']['input']>
  averageScore_not?: InputMaybe<Scalars['Int']['input']>
  chapters?: InputMaybe<Scalars['Int']['input']>
  chapters_greater?: InputMaybe<Scalars['Int']['input']>
  chapters_lesser?: InputMaybe<Scalars['Int']['input']>
  countryOfOrigin?: InputMaybe<Scalars['CountryCode']['input']>
  duration?: InputMaybe<Scalars['Int']['input']>
  duration_greater?: InputMaybe<Scalars['Int']['input']>
  duration_lesser?: InputMaybe<Scalars['Int']['input']>
  endDate?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  endDate_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  endDate_lesser?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  endDate_like?: InputMaybe<Scalars['String']['input']>
  episodes?: InputMaybe<Scalars['Int']['input']>
  episodes_greater?: InputMaybe<Scalars['Int']['input']>
  episodes_lesser?: InputMaybe<Scalars['Int']['input']>
  format?: InputMaybe<MediaFormat>
  format_in?: InputMaybe<ReadonlyArray<InputMaybe<MediaFormat>>>
  format_not?: InputMaybe<MediaFormat>
  format_not_in?: InputMaybe<ReadonlyArray<InputMaybe<MediaFormat>>>
  genre?: InputMaybe<Scalars['String']['input']>
  genre_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>
  genre_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>
  id?: InputMaybe<Scalars['Int']['input']>
  idMal?: InputMaybe<Scalars['Int']['input']>
  idMal_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  idMal_not?: InputMaybe<Scalars['Int']['input']>
  idMal_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  id_not?: InputMaybe<Scalars['Int']['input']>
  id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  isAdult?: InputMaybe<Scalars['Boolean']['input']>
  isLicensed?: InputMaybe<Scalars['Boolean']['input']>
  licensedBy?: InputMaybe<Scalars['String']['input']>
  licensedById?: InputMaybe<Scalars['Int']['input']>
  licensedById_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  licensedBy_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>
  minimumTagRank?: InputMaybe<Scalars['Int']['input']>
  onList?: InputMaybe<Scalars['Boolean']['input']>
  popularity?: InputMaybe<Scalars['Int']['input']>
  popularity_greater?: InputMaybe<Scalars['Int']['input']>
  popularity_lesser?: InputMaybe<Scalars['Int']['input']>
  popularity_not?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  season?: InputMaybe<MediaSeason>
  seasonYear?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<MediaSort>>>
  source?: InputMaybe<MediaSource>
  source_in?: InputMaybe<ReadonlyArray<InputMaybe<MediaSource>>>
  startDate?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  startDate_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  startDate_lesser?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  startDate_like?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<MediaStatus>
  status_in?: InputMaybe<ReadonlyArray<InputMaybe<MediaStatus>>>
  status_not?: InputMaybe<MediaStatus>
  status_not_in?: InputMaybe<ReadonlyArray<InputMaybe<MediaStatus>>>
  tag?: InputMaybe<Scalars['String']['input']>
  tagCategory?: InputMaybe<Scalars['String']['input']>
  tagCategory_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>
  tagCategory_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>
  tag_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>
  tag_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>
  type?: InputMaybe<MediaType>
  volumes?: InputMaybe<Scalars['Int']['input']>
  volumes_greater?: InputMaybe<Scalars['Int']['input']>
  volumes_lesser?: InputMaybe<Scalars['Int']['input']>
}

/** Page of data */
export type PageMediaListArgs = {
  compareWithAuthList?: InputMaybe<Scalars['Boolean']['input']>
  completedAt?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  completedAt_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  completedAt_lesser?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  completedAt_like?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
  isFollowing?: InputMaybe<Scalars['Boolean']['input']>
  mediaId?: InputMaybe<Scalars['Int']['input']>
  mediaId_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  mediaId_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  notes?: InputMaybe<Scalars['String']['input']>
  notes_like?: InputMaybe<Scalars['String']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<MediaListSort>>>
  startedAt?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  startedAt_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  startedAt_lesser?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  startedAt_like?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<MediaListStatus>
  status_in?: InputMaybe<ReadonlyArray<InputMaybe<MediaListStatus>>>
  status_not?: InputMaybe<MediaListStatus>
  status_not_in?: InputMaybe<ReadonlyArray<InputMaybe<MediaListStatus>>>
  type?: InputMaybe<MediaType>
  userId?: InputMaybe<Scalars['Int']['input']>
  userId_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  userName?: InputMaybe<Scalars['String']['input']>
}

/** Page of data */
export type PageMediaTrendsArgs = {
  averageScore?: InputMaybe<Scalars['Int']['input']>
  averageScore_greater?: InputMaybe<Scalars['Int']['input']>
  averageScore_lesser?: InputMaybe<Scalars['Int']['input']>
  averageScore_not?: InputMaybe<Scalars['Int']['input']>
  date?: InputMaybe<Scalars['Int']['input']>
  date_greater?: InputMaybe<Scalars['Int']['input']>
  date_lesser?: InputMaybe<Scalars['Int']['input']>
  episode?: InputMaybe<Scalars['Int']['input']>
  episode_greater?: InputMaybe<Scalars['Int']['input']>
  episode_lesser?: InputMaybe<Scalars['Int']['input']>
  episode_not?: InputMaybe<Scalars['Int']['input']>
  mediaId?: InputMaybe<Scalars['Int']['input']>
  mediaId_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  mediaId_not?: InputMaybe<Scalars['Int']['input']>
  mediaId_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  popularity?: InputMaybe<Scalars['Int']['input']>
  popularity_greater?: InputMaybe<Scalars['Int']['input']>
  popularity_lesser?: InputMaybe<Scalars['Int']['input']>
  popularity_not?: InputMaybe<Scalars['Int']['input']>
  releasing?: InputMaybe<Scalars['Boolean']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<MediaTrendSort>>>
  trending?: InputMaybe<Scalars['Int']['input']>
  trending_greater?: InputMaybe<Scalars['Int']['input']>
  trending_lesser?: InputMaybe<Scalars['Int']['input']>
  trending_not?: InputMaybe<Scalars['Int']['input']>
}

/** Page of data */
export type PageNotificationsArgs = {
  resetNotificationCount?: InputMaybe<Scalars['Boolean']['input']>
  type?: InputMaybe<NotificationType>
  type_in?: InputMaybe<ReadonlyArray<InputMaybe<NotificationType>>>
}

/** Page of data */
export type PageRecommendationsArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
  mediaId?: InputMaybe<Scalars['Int']['input']>
  mediaRecommendationId?: InputMaybe<Scalars['Int']['input']>
  onList?: InputMaybe<Scalars['Boolean']['input']>
  rating?: InputMaybe<Scalars['Int']['input']>
  rating_greater?: InputMaybe<Scalars['Int']['input']>
  rating_lesser?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<RecommendationSort>>>
  userId?: InputMaybe<Scalars['Int']['input']>
}

/** Page of data */
export type PageReviewsArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
  mediaId?: InputMaybe<Scalars['Int']['input']>
  mediaType?: InputMaybe<MediaType>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<ReviewSort>>>
  userId?: InputMaybe<Scalars['Int']['input']>
}

/** Page of data */
export type PageStaffArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
  id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  id_not?: InputMaybe<Scalars['Int']['input']>
  id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  isBirthday?: InputMaybe<Scalars['Boolean']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<StaffSort>>>
}

/** Page of data */
export type PageStudiosArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
  id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  id_not?: InputMaybe<Scalars['Int']['input']>
  id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  search?: InputMaybe<Scalars['String']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<StudioSort>>>
}

/** Page of data */
export type PageThreadCommentsArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<ThreadCommentSort>>>
  threadId?: InputMaybe<Scalars['Int']['input']>
  userId?: InputMaybe<Scalars['Int']['input']>
}

/** Page of data */
export type PageThreadsArgs = {
  categoryId?: InputMaybe<Scalars['Int']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
  id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  mediaCategoryId?: InputMaybe<Scalars['Int']['input']>
  replyUserId?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<ThreadSort>>>
  subscribed?: InputMaybe<Scalars['Boolean']['input']>
  userId?: InputMaybe<Scalars['Int']['input']>
}

/** Page of data */
export type PageUsersArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
  isModerator?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<UserSort>>>
}

export type PageInfo = {
  readonly __typename?: 'PageInfo'
  /** The current page */
  readonly currentPage?: Maybe<Scalars['Int']['output']>
  /** If there is another page */
  readonly hasNextPage?: Maybe<Scalars['Boolean']['output']>
  /** The last page */
  readonly lastPage?: Maybe<Scalars['Int']['output']>
  /** The count on a page */
  readonly perPage?: Maybe<Scalars['Int']['output']>
  /** The total number of items. Note: This value is not guaranteed to be accurate, do not rely on this for logic */
  readonly total?: Maybe<Scalars['Int']['output']>
}

/** Provides the parsed markdown as html */
export type ParsedMarkdown = {
  readonly __typename?: 'ParsedMarkdown'
  /** The parsed markdown as html */
  readonly html?: Maybe<Scalars['String']['output']>
}

export type Query = {
  readonly __typename?: 'Query'
  /** Activity query */
  readonly Activity?: Maybe<ActivityUnion>
  /** Activity reply query */
  readonly ActivityReply?: Maybe<ActivityReply>
  /** Airing schedule query */
  readonly AiringSchedule?: Maybe<AiringSchedule>
  readonly AniChartUser?: Maybe<AniChartUser>
  /** Character query */
  readonly Character?: Maybe<Character>
  /** ExternalLinkSource collection query */
  readonly ExternalLinkSourceCollection?: Maybe<ReadonlyArray<Maybe<MediaExternalLink>>>
  /** Follower query */
  readonly Follower?: Maybe<User>
  /** Following query */
  readonly Following?: Maybe<User>
  /** Collection of all the possible media genres */
  readonly GenreCollection?: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>
  /** Like query */
  readonly Like?: Maybe<User>
  /** Provide AniList markdown to be converted to html (Requires auth) */
  readonly Markdown?: Maybe<ParsedMarkdown>
  /** Media query */
  readonly Media?: Maybe<Media>
  /** Media list query */
  readonly MediaList?: Maybe<MediaList>
  /** Media list collection query, provides list pre-grouped by status & custom lists. User ID and Media Type arguments required. */
  readonly MediaListCollection?: Maybe<MediaListCollection>
  /** Collection of all the possible media tags */
  readonly MediaTagCollection?: Maybe<ReadonlyArray<Maybe<MediaTag>>>
  /** Media Trend query */
  readonly MediaTrend?: Maybe<MediaTrend>
  /** Notification query */
  readonly Notification?: Maybe<NotificationUnion>
  readonly Page?: Maybe<Page>
  /** Recommendation query */
  readonly Recommendation?: Maybe<Recommendation>
  /** Review query */
  readonly Review?: Maybe<Review>
  /** Site statistics query */
  readonly SiteStatistics?: Maybe<SiteStatistics>
  /** Staff query */
  readonly Staff?: Maybe<Staff>
  /** Studio query */
  readonly Studio?: Maybe<Studio>
  /** Thread query */
  readonly Thread?: Maybe<Thread>
  /** Comment query */
  readonly ThreadComment?: Maybe<ReadonlyArray<Maybe<ThreadComment>>>
  /** User query */
  readonly User?: Maybe<User>
  /** Get the currently authenticated user */
  readonly Viewer?: Maybe<User>
}

export type QueryActivityArgs = {
  createdAt?: InputMaybe<Scalars['Int']['input']>
  createdAt_greater?: InputMaybe<Scalars['Int']['input']>
  createdAt_lesser?: InputMaybe<Scalars['Int']['input']>
  hasReplies?: InputMaybe<Scalars['Boolean']['input']>
  hasRepliesOrTypeText?: InputMaybe<Scalars['Boolean']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
  id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  id_not?: InputMaybe<Scalars['Int']['input']>
  id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  isFollowing?: InputMaybe<Scalars['Boolean']['input']>
  mediaId?: InputMaybe<Scalars['Int']['input']>
  mediaId_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  mediaId_not?: InputMaybe<Scalars['Int']['input']>
  mediaId_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  messengerId?: InputMaybe<Scalars['Int']['input']>
  messengerId_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  messengerId_not?: InputMaybe<Scalars['Int']['input']>
  messengerId_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<ActivitySort>>>
  type?: InputMaybe<ActivityType>
  type_in?: InputMaybe<ReadonlyArray<InputMaybe<ActivityType>>>
  type_not?: InputMaybe<ActivityType>
  type_not_in?: InputMaybe<ReadonlyArray<InputMaybe<ActivityType>>>
  userId?: InputMaybe<Scalars['Int']['input']>
  userId_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  userId_not?: InputMaybe<Scalars['Int']['input']>
  userId_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
}

export type QueryActivityReplyArgs = {
  activityId?: InputMaybe<Scalars['Int']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
}

export type QueryAiringScheduleArgs = {
  airingAt?: InputMaybe<Scalars['Int']['input']>
  airingAt_greater?: InputMaybe<Scalars['Int']['input']>
  airingAt_lesser?: InputMaybe<Scalars['Int']['input']>
  episode?: InputMaybe<Scalars['Int']['input']>
  episode_greater?: InputMaybe<Scalars['Int']['input']>
  episode_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  episode_lesser?: InputMaybe<Scalars['Int']['input']>
  episode_not?: InputMaybe<Scalars['Int']['input']>
  episode_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  id?: InputMaybe<Scalars['Int']['input']>
  id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  id_not?: InputMaybe<Scalars['Int']['input']>
  id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  mediaId?: InputMaybe<Scalars['Int']['input']>
  mediaId_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  mediaId_not?: InputMaybe<Scalars['Int']['input']>
  mediaId_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  notYetAired?: InputMaybe<Scalars['Boolean']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<AiringSort>>>
}

export type QueryCharacterArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
  id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  id_not?: InputMaybe<Scalars['Int']['input']>
  id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  isBirthday?: InputMaybe<Scalars['Boolean']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<CharacterSort>>>
}

export type QueryExternalLinkSourceCollectionArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
  mediaType?: InputMaybe<ExternalLinkMediaType>
  type?: InputMaybe<ExternalLinkType>
}

export type QueryFollowerArgs = {
  sort?: InputMaybe<ReadonlyArray<InputMaybe<UserSort>>>
  userId: Scalars['Int']['input']
}

export type QueryFollowingArgs = {
  sort?: InputMaybe<ReadonlyArray<InputMaybe<UserSort>>>
  userId: Scalars['Int']['input']
}

export type QueryLikeArgs = {
  likeableId?: InputMaybe<Scalars['Int']['input']>
  type?: InputMaybe<LikeableType>
}

export type QueryMarkdownArgs = {
  markdown: Scalars['String']['input']
}

export type QueryMediaArgs = {
  averageScore?: InputMaybe<Scalars['Int']['input']>
  averageScore_greater?: InputMaybe<Scalars['Int']['input']>
  averageScore_lesser?: InputMaybe<Scalars['Int']['input']>
  averageScore_not?: InputMaybe<Scalars['Int']['input']>
  chapters?: InputMaybe<Scalars['Int']['input']>
  chapters_greater?: InputMaybe<Scalars['Int']['input']>
  chapters_lesser?: InputMaybe<Scalars['Int']['input']>
  countryOfOrigin?: InputMaybe<Scalars['CountryCode']['input']>
  duration?: InputMaybe<Scalars['Int']['input']>
  duration_greater?: InputMaybe<Scalars['Int']['input']>
  duration_lesser?: InputMaybe<Scalars['Int']['input']>
  endDate?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  endDate_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  endDate_lesser?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  endDate_like?: InputMaybe<Scalars['String']['input']>
  episodes?: InputMaybe<Scalars['Int']['input']>
  episodes_greater?: InputMaybe<Scalars['Int']['input']>
  episodes_lesser?: InputMaybe<Scalars['Int']['input']>
  format?: InputMaybe<MediaFormat>
  format_in?: InputMaybe<ReadonlyArray<InputMaybe<MediaFormat>>>
  format_not?: InputMaybe<MediaFormat>
  format_not_in?: InputMaybe<ReadonlyArray<InputMaybe<MediaFormat>>>
  genre?: InputMaybe<Scalars['String']['input']>
  genre_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>
  genre_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>
  id?: InputMaybe<Scalars['Int']['input']>
  idMal?: InputMaybe<Scalars['Int']['input']>
  idMal_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  idMal_not?: InputMaybe<Scalars['Int']['input']>
  idMal_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  id_not?: InputMaybe<Scalars['Int']['input']>
  id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  isAdult?: InputMaybe<Scalars['Boolean']['input']>
  isLicensed?: InputMaybe<Scalars['Boolean']['input']>
  licensedBy?: InputMaybe<Scalars['String']['input']>
  licensedById?: InputMaybe<Scalars['Int']['input']>
  licensedById_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  licensedBy_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>
  minimumTagRank?: InputMaybe<Scalars['Int']['input']>
  onList?: InputMaybe<Scalars['Boolean']['input']>
  popularity?: InputMaybe<Scalars['Int']['input']>
  popularity_greater?: InputMaybe<Scalars['Int']['input']>
  popularity_lesser?: InputMaybe<Scalars['Int']['input']>
  popularity_not?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  season?: InputMaybe<MediaSeason>
  seasonYear?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<MediaSort>>>
  source?: InputMaybe<MediaSource>
  source_in?: InputMaybe<ReadonlyArray<InputMaybe<MediaSource>>>
  startDate?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  startDate_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  startDate_lesser?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  startDate_like?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<MediaStatus>
  status_in?: InputMaybe<ReadonlyArray<InputMaybe<MediaStatus>>>
  status_not?: InputMaybe<MediaStatus>
  status_not_in?: InputMaybe<ReadonlyArray<InputMaybe<MediaStatus>>>
  tag?: InputMaybe<Scalars['String']['input']>
  tagCategory?: InputMaybe<Scalars['String']['input']>
  tagCategory_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>
  tagCategory_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>
  tag_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>
  tag_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>
  type?: InputMaybe<MediaType>
  volumes?: InputMaybe<Scalars['Int']['input']>
  volumes_greater?: InputMaybe<Scalars['Int']['input']>
  volumes_lesser?: InputMaybe<Scalars['Int']['input']>
}

export type QueryMediaListArgs = {
  compareWithAuthList?: InputMaybe<Scalars['Boolean']['input']>
  completedAt?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  completedAt_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  completedAt_lesser?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  completedAt_like?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
  isFollowing?: InputMaybe<Scalars['Boolean']['input']>
  mediaId?: InputMaybe<Scalars['Int']['input']>
  mediaId_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  mediaId_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  notes?: InputMaybe<Scalars['String']['input']>
  notes_like?: InputMaybe<Scalars['String']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<MediaListSort>>>
  startedAt?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  startedAt_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  startedAt_lesser?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  startedAt_like?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<MediaListStatus>
  status_in?: InputMaybe<ReadonlyArray<InputMaybe<MediaListStatus>>>
  status_not?: InputMaybe<MediaListStatus>
  status_not_in?: InputMaybe<ReadonlyArray<InputMaybe<MediaListStatus>>>
  type?: InputMaybe<MediaType>
  userId?: InputMaybe<Scalars['Int']['input']>
  userId_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  userName?: InputMaybe<Scalars['String']['input']>
}

export type QueryMediaListCollectionArgs = {
  chunk?: InputMaybe<Scalars['Int']['input']>
  completedAt?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  completedAt_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  completedAt_lesser?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  completedAt_like?: InputMaybe<Scalars['String']['input']>
  forceSingleCompletedList?: InputMaybe<Scalars['Boolean']['input']>
  notes?: InputMaybe<Scalars['String']['input']>
  notes_like?: InputMaybe<Scalars['String']['input']>
  perChunk?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<MediaListSort>>>
  startedAt?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  startedAt_greater?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  startedAt_lesser?: InputMaybe<Scalars['FuzzyDateInt']['input']>
  startedAt_like?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<MediaListStatus>
  status_in?: InputMaybe<ReadonlyArray<InputMaybe<MediaListStatus>>>
  status_not?: InputMaybe<MediaListStatus>
  status_not_in?: InputMaybe<ReadonlyArray<InputMaybe<MediaListStatus>>>
  type?: InputMaybe<MediaType>
  userId?: InputMaybe<Scalars['Int']['input']>
  userName?: InputMaybe<Scalars['String']['input']>
}

export type QueryMediaTagCollectionArgs = {
  status?: InputMaybe<Scalars['Int']['input']>
}

export type QueryMediaTrendArgs = {
  averageScore?: InputMaybe<Scalars['Int']['input']>
  averageScore_greater?: InputMaybe<Scalars['Int']['input']>
  averageScore_lesser?: InputMaybe<Scalars['Int']['input']>
  averageScore_not?: InputMaybe<Scalars['Int']['input']>
  date?: InputMaybe<Scalars['Int']['input']>
  date_greater?: InputMaybe<Scalars['Int']['input']>
  date_lesser?: InputMaybe<Scalars['Int']['input']>
  episode?: InputMaybe<Scalars['Int']['input']>
  episode_greater?: InputMaybe<Scalars['Int']['input']>
  episode_lesser?: InputMaybe<Scalars['Int']['input']>
  episode_not?: InputMaybe<Scalars['Int']['input']>
  mediaId?: InputMaybe<Scalars['Int']['input']>
  mediaId_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  mediaId_not?: InputMaybe<Scalars['Int']['input']>
  mediaId_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  popularity?: InputMaybe<Scalars['Int']['input']>
  popularity_greater?: InputMaybe<Scalars['Int']['input']>
  popularity_lesser?: InputMaybe<Scalars['Int']['input']>
  popularity_not?: InputMaybe<Scalars['Int']['input']>
  releasing?: InputMaybe<Scalars['Boolean']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<MediaTrendSort>>>
  trending?: InputMaybe<Scalars['Int']['input']>
  trending_greater?: InputMaybe<Scalars['Int']['input']>
  trending_lesser?: InputMaybe<Scalars['Int']['input']>
  trending_not?: InputMaybe<Scalars['Int']['input']>
}

export type QueryNotificationArgs = {
  resetNotificationCount?: InputMaybe<Scalars['Boolean']['input']>
  type?: InputMaybe<NotificationType>
  type_in?: InputMaybe<ReadonlyArray<InputMaybe<NotificationType>>>
}

export type QueryPageArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
  perPage?: InputMaybe<Scalars['Int']['input']>
}

export type QueryRecommendationArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
  mediaId?: InputMaybe<Scalars['Int']['input']>
  mediaRecommendationId?: InputMaybe<Scalars['Int']['input']>
  onList?: InputMaybe<Scalars['Boolean']['input']>
  rating?: InputMaybe<Scalars['Int']['input']>
  rating_greater?: InputMaybe<Scalars['Int']['input']>
  rating_lesser?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<RecommendationSort>>>
  userId?: InputMaybe<Scalars['Int']['input']>
}

export type QueryReviewArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
  mediaId?: InputMaybe<Scalars['Int']['input']>
  mediaType?: InputMaybe<MediaType>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<ReviewSort>>>
  userId?: InputMaybe<Scalars['Int']['input']>
}

export type QueryStaffArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
  id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  id_not?: InputMaybe<Scalars['Int']['input']>
  id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  isBirthday?: InputMaybe<Scalars['Boolean']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<StaffSort>>>
}

export type QueryStudioArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
  id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  id_not?: InputMaybe<Scalars['Int']['input']>
  id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  search?: InputMaybe<Scalars['String']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<StudioSort>>>
}

export type QueryThreadArgs = {
  categoryId?: InputMaybe<Scalars['Int']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
  id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']['input']>>>
  mediaCategoryId?: InputMaybe<Scalars['Int']['input']>
  replyUserId?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<ThreadSort>>>
  subscribed?: InputMaybe<Scalars['Boolean']['input']>
  userId?: InputMaybe<Scalars['Int']['input']>
}

export type QueryThreadCommentArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<ThreadCommentSort>>>
  threadId?: InputMaybe<Scalars['Int']['input']>
  userId?: InputMaybe<Scalars['Int']['input']>
}

export type QueryUserArgs = {
  id?: InputMaybe<Scalars['Int']['input']>
  isModerator?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<UserSort>>>
}

/** Media recommendation */
export type Recommendation = {
  readonly __typename?: 'Recommendation'
  /** The id of the recommendation */
  readonly id: Scalars['Int']['output']
  /** The media the recommendation is from */
  readonly media?: Maybe<Media>
  /** The recommended media */
  readonly mediaRecommendation?: Maybe<Media>
  /** Users rating of the recommendation */
  readonly rating?: Maybe<Scalars['Int']['output']>
  /** The user that first created the recommendation */
  readonly user?: Maybe<User>
  /** The rating of the recommendation by currently authenticated user */
  readonly userRating?: Maybe<RecommendationRating | `${RecommendationRating}`>
}

export type RecommendationConnection = {
  readonly __typename?: 'RecommendationConnection'
  readonly edges?: Maybe<ReadonlyArray<Maybe<RecommendationEdge>>>
  readonly nodes?: Maybe<ReadonlyArray<Maybe<Recommendation>>>
  /** The pagination information */
  readonly pageInfo?: Maybe<PageInfo>
}

/** Recommendation connection edge */
export type RecommendationEdge = {
  readonly __typename?: 'RecommendationEdge'
  readonly node?: Maybe<Recommendation>
}

/** Recommendation rating enums */
export type RecommendationRating = 'NO_RATING' | 'RATE_DOWN' | 'RATE_UP'

/** Recommendation sort enums */
export type RecommendationSort = 'ID' | 'ID_DESC' | 'RATING' | 'RATING_DESC'

/** Notification for when new media is added to the site */
export type RelatedMediaAdditionNotification = {
  readonly __typename?: 'RelatedMediaAdditionNotification'
  /** The notification context text */
  readonly context?: Maybe<Scalars['String']['output']>
  /** The time the notification was created at */
  readonly createdAt?: Maybe<Scalars['Int']['output']>
  /** The id of the Notification */
  readonly id: Scalars['Int']['output']
  /** The associated media of the airing schedule */
  readonly media?: Maybe<Media>
  /** The id of the new media */
  readonly mediaId: Scalars['Int']['output']
  /** The type of notification */
  readonly type?: Maybe<NotificationType | `${NotificationType}`>
}

export type Report = {
  readonly __typename?: 'Report'
  readonly cleared?: Maybe<Scalars['Boolean']['output']>
  /** When the entry data was created */
  readonly createdAt?: Maybe<Scalars['Int']['output']>
  readonly id: Scalars['Int']['output']
  readonly reason?: Maybe<Scalars['String']['output']>
  readonly reported?: Maybe<User>
  readonly reporter?: Maybe<User>
}

/** A Review that features in an anime or manga */
export type Review = {
  readonly __typename?: 'Review'
  /** The main review body text */
  readonly body?: Maybe<Scalars['String']['output']>
  /** The time of the thread creation */
  readonly createdAt: Scalars['Int']['output']
  /** The id of the review */
  readonly id: Scalars['Int']['output']
  /** The media the review is of */
  readonly media?: Maybe<Media>
  /** The id of the review's media */
  readonly mediaId: Scalars['Int']['output']
  /** For which type of media the review is for */
  readonly mediaType?: Maybe<MediaType | `${MediaType}`>
  /** If the review is not yet publicly published and is only viewable by creator */
  readonly private?: Maybe<Scalars['Boolean']['output']>
  /** The total user rating of the review */
  readonly rating?: Maybe<Scalars['Int']['output']>
  /** The amount of user ratings of the review */
  readonly ratingAmount?: Maybe<Scalars['Int']['output']>
  /** The review score of the media */
  readonly score?: Maybe<Scalars['Int']['output']>
  /** The url for the review page on the AniList website */
  readonly siteUrl?: Maybe<Scalars['String']['output']>
  /** A short summary of the review */
  readonly summary?: Maybe<Scalars['String']['output']>
  /** The time of the thread last update */
  readonly updatedAt: Scalars['Int']['output']
  /** The creator of the review */
  readonly user?: Maybe<User>
  /** The id of the review's creator */
  readonly userId: Scalars['Int']['output']
  /** The rating of the review by currently authenticated user */
  readonly userRating?: Maybe<ReviewRating | `${ReviewRating}`>
}

/** A Review that features in an anime or manga */
export type ReviewBodyArgs = {
  asHtml?: InputMaybe<Scalars['Boolean']['input']>
}

export type ReviewConnection = {
  readonly __typename?: 'ReviewConnection'
  readonly edges?: Maybe<ReadonlyArray<Maybe<ReviewEdge>>>
  readonly nodes?: Maybe<ReadonlyArray<Maybe<Review>>>
  /** The pagination information */
  readonly pageInfo?: Maybe<PageInfo>
}

/** Review connection edge */
export type ReviewEdge = {
  readonly __typename?: 'ReviewEdge'
  readonly node?: Maybe<Review>
}

/** Review rating enums */
export type ReviewRating = 'DOWN_VOTE' | 'NO_VOTE' | 'UP_VOTE'

/** Review sort enums */
export type ReviewSort =
  | 'CREATED_AT'
  | 'CREATED_AT_DESC'
  | 'ID'
  | 'ID_DESC'
  | 'RATING'
  | 'RATING_DESC'
  | 'SCORE'
  | 'SCORE_DESC'
  | 'UPDATED_AT'
  | 'UPDATED_AT_DESC'

/** Feed of mod edit activity */
export type RevisionHistory = {
  readonly __typename?: 'RevisionHistory'
  /** The action taken on the objects */
  readonly action?: Maybe<RevisionHistoryAction | `${RevisionHistoryAction}`>
  /** A JSON object of the fields that changed */
  readonly changes?: Maybe<Scalars['Json']['output']>
  /** The character the mod feed entry references */
  readonly character?: Maybe<Character>
  /** When the mod feed entry was created */
  readonly createdAt?: Maybe<Scalars['Int']['output']>
  /** The external link source the mod feed entry references */
  readonly externalLink?: Maybe<MediaExternalLink>
  /** The id of the media */
  readonly id: Scalars['Int']['output']
  /** The media the mod feed entry references */
  readonly media?: Maybe<Media>
  /** The staff member the mod feed entry references */
  readonly staff?: Maybe<Staff>
  /** The studio the mod feed entry references */
  readonly studio?: Maybe<Studio>
  /** The user who made the edit to the object */
  readonly user?: Maybe<User>
}

/** Revision history actions */
export type RevisionHistoryAction = 'CREATE' | 'EDIT'

/** A user's list score distribution. */
export type ScoreDistribution = {
  readonly __typename?: 'ScoreDistribution'
  /** The amount of list entries with this score */
  readonly amount?: Maybe<Scalars['Int']['output']>
  readonly score?: Maybe<Scalars['Int']['output']>
}

/** Media list scoring type */
export type ScoreFormat =
  /** An integer from 0-3. Should be represented in Smileys. 0 => No Score, 1 => :(, 2 => :|, 3 => :) */
  | 'POINT_3'
  /** An integer from 0-5. Should be represented in Stars */
  | 'POINT_5'
  /** An integer from 0-10 */
  | 'POINT_10'
  /** A float from 0-10 with 1 decimal place */
  | 'POINT_10_DECIMAL'
  /** An integer from 0-100 */
  | 'POINT_100'

export type SiteStatistics = {
  readonly __typename?: 'SiteStatistics'
  readonly anime?: Maybe<SiteTrendConnection>
  readonly characters?: Maybe<SiteTrendConnection>
  readonly manga?: Maybe<SiteTrendConnection>
  readonly reviews?: Maybe<SiteTrendConnection>
  readonly staff?: Maybe<SiteTrendConnection>
  readonly studios?: Maybe<SiteTrendConnection>
  readonly users?: Maybe<SiteTrendConnection>
}

export type SiteStatisticsAnimeArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
  perPage?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<SiteTrendSort>>>
}

export type SiteStatisticsCharactersArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
  perPage?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<SiteTrendSort>>>
}

export type SiteStatisticsMangaArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
  perPage?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<SiteTrendSort>>>
}

export type SiteStatisticsReviewsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
  perPage?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<SiteTrendSort>>>
}

export type SiteStatisticsStaffArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
  perPage?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<SiteTrendSort>>>
}

export type SiteStatisticsStudiosArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
  perPage?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<SiteTrendSort>>>
}

export type SiteStatisticsUsersArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
  perPage?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<SiteTrendSort>>>
}

/** Daily site statistics */
export type SiteTrend = {
  readonly __typename?: 'SiteTrend'
  /** The change from yesterday */
  readonly change: Scalars['Int']['output']
  readonly count: Scalars['Int']['output']
  /** The day the data was recorded (timestamp) */
  readonly date: Scalars['Int']['output']
}

export type SiteTrendConnection = {
  readonly __typename?: 'SiteTrendConnection'
  readonly edges?: Maybe<ReadonlyArray<Maybe<SiteTrendEdge>>>
  readonly nodes?: Maybe<ReadonlyArray<Maybe<SiteTrend>>>
  /** The pagination information */
  readonly pageInfo?: Maybe<PageInfo>
}

/** Site trend connection edge */
export type SiteTrendEdge = {
  readonly __typename?: 'SiteTrendEdge'
  readonly node?: Maybe<SiteTrend>
}

/** Site trend sort enums */
export type SiteTrendSort = 'CHANGE' | 'CHANGE_DESC' | 'COUNT' | 'COUNT_DESC' | 'DATE' | 'DATE_DESC'

/** Voice actors or production staff */
export type Staff = {
  readonly __typename?: 'Staff'
  /** The person's age in years */
  readonly age?: Maybe<Scalars['Int']['output']>
  /** The persons blood type */
  readonly bloodType?: Maybe<Scalars['String']['output']>
  /** Media the actor voiced characters in. (Same data as characters with media as node instead of characters) */
  readonly characterMedia?: Maybe<MediaConnection>
  /** Characters voiced by the actor */
  readonly characters?: Maybe<CharacterConnection>
  readonly dateOfBirth?: Maybe<FuzzyDate>
  readonly dateOfDeath?: Maybe<FuzzyDate>
  /** A general description of the staff member */
  readonly description?: Maybe<Scalars['String']['output']>
  /** The amount of user's who have favourited the staff member */
  readonly favourites?: Maybe<Scalars['Int']['output']>
  /** The staff's gender. Usually Male, Female, or Non-binary but can be any string. */
  readonly gender?: Maybe<Scalars['String']['output']>
  /** The persons birthplace or hometown */
  readonly homeTown?: Maybe<Scalars['String']['output']>
  /** The id of the staff member */
  readonly id: Scalars['Int']['output']
  /** The staff images */
  readonly image?: Maybe<StaffImage>
  /** If the staff member is marked as favourite by the currently authenticated user */
  readonly isFavourite: Scalars['Boolean']['output']
  /** If the staff member is blocked from being added to favourites */
  readonly isFavouriteBlocked: Scalars['Boolean']['output']
  /**
   * The primary language the staff member dub's in
   * @deprecated Replaced with languageV2
   */
  readonly language?: Maybe<StaffLanguage | `${StaffLanguage}`>
  /** The primary language of the staff member. Current values: Japanese, English, Korean, Italian, Spanish, Portuguese, French, German, Hebrew, Hungarian, Chinese, Arabic, Filipino, Catalan, Finnish, Turkish, Dutch, Swedish, Thai, Tagalog, Malaysian, Indonesian, Vietnamese, Nepali, Hindi, Urdu */
  readonly languageV2?: Maybe<Scalars['String']['output']>
  /** Notes for site moderators */
  readonly modNotes?: Maybe<Scalars['String']['output']>
  /** The names of the staff member */
  readonly name?: Maybe<StaffName>
  /** The person's primary occupations */
  readonly primaryOccupations?: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>
  /** The url for the staff page on the AniList website */
  readonly siteUrl?: Maybe<Scalars['String']['output']>
  /** Staff member that the submission is referencing */
  readonly staff?: Maybe<Staff>
  /** Media where the staff member has a production role */
  readonly staffMedia?: Maybe<MediaConnection>
  /** Inner details of submission status */
  readonly submissionNotes?: Maybe<Scalars['String']['output']>
  /** Status of the submission */
  readonly submissionStatus?: Maybe<Scalars['Int']['output']>
  /** Submitter for the submission */
  readonly submitter?: Maybe<User>
  /** @deprecated No data available */
  readonly updatedAt?: Maybe<Scalars['Int']['output']>
  /** [startYear, endYear] (If the 2nd value is not present staff is still active) */
  readonly yearsActive?: Maybe<ReadonlyArray<Maybe<Scalars['Int']['output']>>>
}

/** Voice actors or production staff */
export type StaffCharacterMediaArgs = {
  onList?: InputMaybe<Scalars['Boolean']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  perPage?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<MediaSort>>>
}

/** Voice actors or production staff */
export type StaffCharactersArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
  perPage?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<CharacterSort>>>
}

/** Voice actors or production staff */
export type StaffDescriptionArgs = {
  asHtml?: InputMaybe<Scalars['Boolean']['input']>
}

/** Voice actors or production staff */
export type StaffStaffMediaArgs = {
  onList?: InputMaybe<Scalars['Boolean']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  perPage?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<MediaSort>>>
  type?: InputMaybe<MediaType>
}

export type StaffConnection = {
  readonly __typename?: 'StaffConnection'
  readonly edges?: Maybe<ReadonlyArray<Maybe<StaffEdge>>>
  readonly nodes?: Maybe<ReadonlyArray<Maybe<Staff>>>
  /** The pagination information */
  readonly pageInfo?: Maybe<PageInfo>
}

/** Staff connection edge */
export type StaffEdge = {
  readonly __typename?: 'StaffEdge'
  /** The order the staff should be displayed from the users favourites */
  readonly favouriteOrder?: Maybe<Scalars['Int']['output']>
  /** The id of the connection */
  readonly id?: Maybe<Scalars['Int']['output']>
  readonly node?: Maybe<Staff>
  /** The role of the staff member in the production of the media */
  readonly role?: Maybe<Scalars['String']['output']>
}

export type StaffImage = {
  readonly __typename?: 'StaffImage'
  /** The person's image of media at its largest size */
  readonly large?: Maybe<Scalars['String']['output']>
  /** The person's image of media at medium size */
  readonly medium?: Maybe<Scalars['String']['output']>
}

/** The primary language of the voice actor */
export type StaffLanguage =
  /** English */
  | 'ENGLISH'
  /** French */
  | 'FRENCH'
  /** German */
  | 'GERMAN'
  /** Hebrew */
  | 'HEBREW'
  /** Hungarian */
  | 'HUNGARIAN'
  /** Italian */
  | 'ITALIAN'
  /** Japanese */
  | 'JAPANESE'
  /** Korean */
  | 'KOREAN'
  /** Portuguese */
  | 'PORTUGUESE'
  /** Spanish */
  | 'SPANISH'

/** The names of the staff member */
export type StaffName = {
  readonly __typename?: 'StaffName'
  /** Other names the staff member might be referred to as (pen names) */
  readonly alternative?: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>
  /** The person's given name */
  readonly first?: Maybe<Scalars['String']['output']>
  /** The person's first and last name */
  readonly full?: Maybe<Scalars['String']['output']>
  /** The person's surname */
  readonly last?: Maybe<Scalars['String']['output']>
  /** The person's middle name */
  readonly middle?: Maybe<Scalars['String']['output']>
  /** The person's full name in their native language */
  readonly native?: Maybe<Scalars['String']['output']>
  /** The currently authenticated users preferred name language. Default romaji for non-authenticated */
  readonly userPreferred?: Maybe<Scalars['String']['output']>
}

/** The names of the staff member */
export type StaffNameInput = {
  /** Other names the character might be referred by */
  readonly alternative?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']['input']>>>
  /** The person's given name */
  readonly first?: InputMaybe<Scalars['String']['input']>
  /** The person's surname */
  readonly last?: InputMaybe<Scalars['String']['input']>
  /** The person's middle name */
  readonly middle?: InputMaybe<Scalars['String']['input']>
  /** The person's full name in their native language */
  readonly native?: InputMaybe<Scalars['String']['input']>
}

/** Voice actor role for a character */
export type StaffRoleType = {
  readonly __typename?: 'StaffRoleType'
  /** Used for grouping roles where multiple dubs exist for the same language. Either dubbing company name or language variant. */
  readonly dubGroup?: Maybe<Scalars['String']['output']>
  /** Notes regarding the VA's role for the character */
  readonly roleNotes?: Maybe<Scalars['String']['output']>
  /** The voice actors of the character */
  readonly voiceActor?: Maybe<Staff>
}

/** Staff sort enums */
export type StaffSort =
  | 'FAVOURITES'
  | 'FAVOURITES_DESC'
  | 'ID'
  | 'ID_DESC'
  | 'LANGUAGE'
  | 'LANGUAGE_DESC'
  /** Order manually decided by moderators */
  | 'RELEVANCE'
  | 'ROLE'
  | 'ROLE_DESC'
  | 'SEARCH_MATCH'

/** User's staff statistics */
export type StaffStats = {
  readonly __typename?: 'StaffStats'
  readonly amount?: Maybe<Scalars['Int']['output']>
  readonly meanScore?: Maybe<Scalars['Int']['output']>
  readonly staff?: Maybe<Staff>
  /** The amount of time in minutes the staff member has been watched by the user */
  readonly timeWatched?: Maybe<Scalars['Int']['output']>
}

/** A submission for a staff that features in an anime or manga */
export type StaffSubmission = {
  readonly __typename?: 'StaffSubmission'
  /** Data Mod assigned to handle the submission */
  readonly assignee?: Maybe<User>
  readonly createdAt?: Maybe<Scalars['Int']['output']>
  /** The id of the submission */
  readonly id: Scalars['Int']['output']
  /** Whether the submission is locked */
  readonly locked?: Maybe<Scalars['Boolean']['output']>
  /** Inner details of submission status */
  readonly notes?: Maybe<Scalars['String']['output']>
  readonly source?: Maybe<Scalars['String']['output']>
  /** Staff that the submission is referencing */
  readonly staff?: Maybe<Staff>
  /** Status of the submission */
  readonly status?: Maybe<SubmissionStatus | `${SubmissionStatus}`>
  /** The staff submission changes */
  readonly submission?: Maybe<Staff>
  /** Submitter for the submission */
  readonly submitter?: Maybe<User>
}

/** Notification for when a staff submission is accepted, partially accepted, or rejected */
export type StaffSubmissionUpdateNotification = {
  readonly __typename?: 'StaffSubmissionUpdateNotification'
  /** The notification context text */
  readonly contexts?: Maybe<ReadonlyArray<Maybe<Scalars['String']['output']>>>
  /** The time the notification was created at */
  readonly createdAt?: Maybe<Scalars['Int']['output']>
  /** The id of the Notification */
  readonly id: Scalars['Int']['output']
  /** The notes of the submission */
  readonly notes?: Maybe<Scalars['String']['output']>
  /** The staff that was modified. */
  readonly staff?: Maybe<Staff>
  /** The status of the submission */
  readonly status?: Maybe<Scalars['String']['output']>
  /** The type of notification */
  readonly type?: Maybe<NotificationType | `${NotificationType}`>
}

/** The distribution of the watching/reading status of media or a user's list */
export type StatusDistribution = {
  readonly __typename?: 'StatusDistribution'
  /** The amount of entries with this status */
  readonly amount?: Maybe<Scalars['Int']['output']>
  /** The day the activity took place (Unix timestamp) */
  readonly status?: Maybe<MediaListStatus | `${MediaListStatus}`>
}

/** Animation or production company */
export type Studio = {
  readonly __typename?: 'Studio'
  /** The amount of user's who have favourited the studio */
  readonly favourites?: Maybe<Scalars['Int']['output']>
  /** The id of the studio */
  readonly id: Scalars['Int']['output']
  /** If the studio is an animation studio or a different kind of company */
  readonly isAnimationStudio: Scalars['Boolean']['output']
  /** If the studio is marked as favourite by the currently authenticated user */
  readonly isFavourite: Scalars['Boolean']['output']
  /** The media the studio has worked on */
  readonly media?: Maybe<MediaConnection>
  /** The name of the studio */
  readonly name: Scalars['String']['output']
  /** The url for the studio page on the AniList website */
  readonly siteUrl?: Maybe<Scalars['String']['output']>
}

/** Animation or production company */
export type StudioMediaArgs = {
  isMain?: InputMaybe<Scalars['Boolean']['input']>
  onList?: InputMaybe<Scalars['Boolean']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  perPage?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<MediaSort>>>
}

export type StudioConnection = {
  readonly __typename?: 'StudioConnection'
  readonly edges?: Maybe<ReadonlyArray<Maybe<StudioEdge>>>
  readonly nodes?: Maybe<ReadonlyArray<Maybe<Studio>>>
  /** The pagination information */
  readonly pageInfo?: Maybe<PageInfo>
}

/** Studio connection edge */
export type StudioEdge = {
  readonly __typename?: 'StudioEdge'
  /** The order the character should be displayed from the users favourites */
  readonly favouriteOrder?: Maybe<Scalars['Int']['output']>
  /** The id of the connection */
  readonly id?: Maybe<Scalars['Int']['output']>
  /** If the studio is the main animation studio of the anime */
  readonly isMain: Scalars['Boolean']['output']
  readonly node?: Maybe<Studio>
}

/** Studio sort enums */
export type StudioSort =
  | 'FAVOURITES'
  | 'FAVOURITES_DESC'
  | 'ID'
  | 'ID_DESC'
  | 'NAME'
  | 'NAME_DESC'
  | 'SEARCH_MATCH'

/** User's studio statistics */
export type StudioStats = {
  readonly __typename?: 'StudioStats'
  readonly amount?: Maybe<Scalars['Int']['output']>
  readonly meanScore?: Maybe<Scalars['Int']['output']>
  readonly studio?: Maybe<Studio>
  /** The amount of time in minutes the studio's works have been watched by the user */
  readonly timeWatched?: Maybe<Scalars['Int']['output']>
}

/** Submission sort enums */
export type SubmissionSort = 'ID' | 'ID_DESC'

/** Submission status */
export type SubmissionStatus = 'ACCEPTED' | 'PARTIALLY_ACCEPTED' | 'PENDING' | 'REJECTED'

/** User's tag statistics */
export type TagStats = {
  readonly __typename?: 'TagStats'
  readonly amount?: Maybe<Scalars['Int']['output']>
  readonly meanScore?: Maybe<Scalars['Int']['output']>
  readonly tag?: Maybe<MediaTag>
  /** The amount of time in minutes the tag has been watched by the user */
  readonly timeWatched?: Maybe<Scalars['Int']['output']>
}

/** User text activity */
export type TextActivity = {
  readonly __typename?: 'TextActivity'
  /** The time the activity was created at */
  readonly createdAt: Scalars['Int']['output']
  /** The id of the activity */
  readonly id: Scalars['Int']['output']
  /** If the currently authenticated user liked the activity */
  readonly isLiked?: Maybe<Scalars['Boolean']['output']>
  /** If the activity is locked and can receive replies */
  readonly isLocked?: Maybe<Scalars['Boolean']['output']>
  /** If the activity is pinned to the top of the users activity feed */
  readonly isPinned?: Maybe<Scalars['Boolean']['output']>
  /** If the currently authenticated user is subscribed to the activity */
  readonly isSubscribed?: Maybe<Scalars['Boolean']['output']>
  /** The amount of likes the activity has */
  readonly likeCount: Scalars['Int']['output']
  /** The users who liked the activity */
  readonly likes?: Maybe<ReadonlyArray<Maybe<User>>>
  /** The written replies to the activity */
  readonly replies?: Maybe<ReadonlyArray<Maybe<ActivityReply>>>
  /** The number of activity replies */
  readonly replyCount: Scalars['Int']['output']
  /** The url for the activity page on the AniList website */
  readonly siteUrl?: Maybe<Scalars['String']['output']>
  /** The status text (Markdown) */
  readonly text?: Maybe<Scalars['String']['output']>
  /** The type of activity */
  readonly type?: Maybe<ActivityType | `${ActivityType}`>
  /** The user who created the activity */
  readonly user?: Maybe<User>
  /** The user id of the activity's creator */
  readonly userId?: Maybe<Scalars['Int']['output']>
}

/** User text activity */
export type TextActivityTextArgs = {
  asHtml?: InputMaybe<Scalars['Boolean']['input']>
}

/** Forum Thread */
export type Thread = {
  readonly __typename?: 'Thread'
  /** The text body of the thread (Markdown) */
  readonly body?: Maybe<Scalars['String']['output']>
  /** The categories of the thread */
  readonly categories?: Maybe<ReadonlyArray<Maybe<ThreadCategory>>>
  /** The time of the thread creation */
  readonly createdAt: Scalars['Int']['output']
  /** The id of the thread */
  readonly id: Scalars['Int']['output']
  /** If the currently authenticated user liked the thread */
  readonly isLiked?: Maybe<Scalars['Boolean']['output']>
  /** If the thread is locked and can receive comments */
  readonly isLocked?: Maybe<Scalars['Boolean']['output']>
  /** If the thread is stickied and should be displayed at the top of the page */
  readonly isSticky?: Maybe<Scalars['Boolean']['output']>
  /** If the currently authenticated user is subscribed to the thread */
  readonly isSubscribed?: Maybe<Scalars['Boolean']['output']>
  /** The amount of likes the thread has */
  readonly likeCount: Scalars['Int']['output']
  /** The users who liked the thread */
  readonly likes?: Maybe<ReadonlyArray<Maybe<User>>>
  /** The media categories of the thread */
  readonly mediaCategories?: Maybe<ReadonlyArray<Maybe<Media>>>
  /** The time of the last reply */
  readonly repliedAt?: Maybe<Scalars['Int']['output']>
  /** The id of the most recent comment on the thread */
  readonly replyCommentId?: Maybe<Scalars['Int']['output']>
  /** The number of comments on the thread */
  readonly replyCount?: Maybe<Scalars['Int']['output']>
  /** The user to last reply to the thread */
  readonly replyUser?: Maybe<User>
  /** The id of the user who most recently commented on the thread */
  readonly replyUserId?: Maybe<Scalars['Int']['output']>
  /** The url for the thread page on the AniList website */
  readonly siteUrl?: Maybe<Scalars['String']['output']>
  /** The title of the thread */
  readonly title?: Maybe<Scalars['String']['output']>
  /** The time of the thread last update */
  readonly updatedAt: Scalars['Int']['output']
  /** The owner of the thread */
  readonly user?: Maybe<User>
  /** The id of the thread owner user */
  readonly userId: Scalars['Int']['output']
  /** The number of times users have viewed the thread */
  readonly viewCount?: Maybe<Scalars['Int']['output']>
}

/** Forum Thread */
export type ThreadBodyArgs = {
  asHtml?: InputMaybe<Scalars['Boolean']['input']>
}

/** A forum thread category */
export type ThreadCategory = {
  readonly __typename?: 'ThreadCategory'
  /** The id of the category */
  readonly id: Scalars['Int']['output']
  /** The name of the category */
  readonly name: Scalars['String']['output']
}

/** Forum Thread Comment */
export type ThreadComment = {
  readonly __typename?: 'ThreadComment'
  /** The comment's child reply comments */
  readonly childComments?: Maybe<Scalars['Json']['output']>
  /** The text content of the comment (Markdown) */
  readonly comment?: Maybe<Scalars['String']['output']>
  /** The time of the comments creation */
  readonly createdAt: Scalars['Int']['output']
  /** The id of the comment */
  readonly id: Scalars['Int']['output']
  /** If the currently authenticated user liked the comment */
  readonly isLiked?: Maybe<Scalars['Boolean']['output']>
  /** If the comment tree is locked and may not receive replies or edits */
  readonly isLocked?: Maybe<Scalars['Boolean']['output']>
  /** The amount of likes the comment has */
  readonly likeCount: Scalars['Int']['output']
  /** The users who liked the comment */
  readonly likes?: Maybe<ReadonlyArray<Maybe<User>>>
  /** The url for the comment page on the AniList website */
  readonly siteUrl?: Maybe<Scalars['String']['output']>
  /** The thread the comment belongs to */
  readonly thread?: Maybe<Thread>
  /** The id of thread the comment belongs to */
  readonly threadId?: Maybe<Scalars['Int']['output']>
  /** The time of the comments last update */
  readonly updatedAt: Scalars['Int']['output']
  /** The user who created the comment */
  readonly user?: Maybe<User>
  /** The user id of the comment's owner */
  readonly userId?: Maybe<Scalars['Int']['output']>
}

/** Forum Thread Comment */
export type ThreadCommentCommentArgs = {
  asHtml?: InputMaybe<Scalars['Boolean']['input']>
}

/** Notification for when a thread comment is liked */
export type ThreadCommentLikeNotification = {
  readonly __typename?: 'ThreadCommentLikeNotification'
  /** The thread comment that was liked */
  readonly comment?: Maybe<ThreadComment>
  /** The id of the activity which was liked */
  readonly commentId: Scalars['Int']['output']
  /** The notification context text */
  readonly context?: Maybe<Scalars['String']['output']>
  /** The time the notification was created at */
  readonly createdAt?: Maybe<Scalars['Int']['output']>
  /** The id of the Notification */
  readonly id: Scalars['Int']['output']
  /** The thread that the relevant comment belongs to */
  readonly thread?: Maybe<Thread>
  /** The type of notification */
  readonly type?: Maybe<NotificationType | `${NotificationType}`>
  /** The user who liked the activity */
  readonly user?: Maybe<User>
  /** The id of the user who liked to the activity */
  readonly userId: Scalars['Int']['output']
}

/** Notification for when authenticated user is @ mentioned in a forum thread comment */
export type ThreadCommentMentionNotification = {
  readonly __typename?: 'ThreadCommentMentionNotification'
  /** The thread comment that included the @ mention */
  readonly comment?: Maybe<ThreadComment>
  /** The id of the comment where mentioned */
  readonly commentId: Scalars['Int']['output']
  /** The notification context text */
  readonly context?: Maybe<Scalars['String']['output']>
  /** The time the notification was created at */
  readonly createdAt?: Maybe<Scalars['Int']['output']>
  /** The id of the Notification */
  readonly id: Scalars['Int']['output']
  /** The thread that the relevant comment belongs to */
  readonly thread?: Maybe<Thread>
  /** The type of notification */
  readonly type?: Maybe<NotificationType | `${NotificationType}`>
  /** The user who mentioned the authenticated user */
  readonly user?: Maybe<User>
  /** The id of the user who mentioned the authenticated user */
  readonly userId: Scalars['Int']['output']
}

/** Notification for when a user replies to your forum thread comment */
export type ThreadCommentReplyNotification = {
  readonly __typename?: 'ThreadCommentReplyNotification'
  /** The reply thread comment */
  readonly comment?: Maybe<ThreadComment>
  /** The id of the reply comment */
  readonly commentId: Scalars['Int']['output']
  /** The notification context text */
  readonly context?: Maybe<Scalars['String']['output']>
  /** The time the notification was created at */
  readonly createdAt?: Maybe<Scalars['Int']['output']>
  /** The id of the Notification */
  readonly id: Scalars['Int']['output']
  /** The thread that the relevant comment belongs to */
  readonly thread?: Maybe<Thread>
  /** The type of notification */
  readonly type?: Maybe<NotificationType | `${NotificationType}`>
  /** The user who replied to the activity */
  readonly user?: Maybe<User>
  /** The id of the user who create the comment reply */
  readonly userId: Scalars['Int']['output']
}

/** Thread comments sort enums */
export type ThreadCommentSort = 'ID' | 'ID_DESC'

/** Notification for when a user replies to a subscribed forum thread */
export type ThreadCommentSubscribedNotification = {
  readonly __typename?: 'ThreadCommentSubscribedNotification'
  /** The reply thread comment */
  readonly comment?: Maybe<ThreadComment>
  /** The id of the new comment in the subscribed thread */
  readonly commentId: Scalars['Int']['output']
  /** The notification context text */
  readonly context?: Maybe<Scalars['String']['output']>
  /** The time the notification was created at */
  readonly createdAt?: Maybe<Scalars['Int']['output']>
  /** The id of the Notification */
  readonly id: Scalars['Int']['output']
  /** The thread that the relevant comment belongs to */
  readonly thread?: Maybe<Thread>
  /** The type of notification */
  readonly type?: Maybe<NotificationType | `${NotificationType}`>
  /** The user who replied to the subscribed thread */
  readonly user?: Maybe<User>
  /** The id of the user who commented on the thread */
  readonly userId: Scalars['Int']['output']
}

/** Notification for when a thread is liked */
export type ThreadLikeNotification = {
  readonly __typename?: 'ThreadLikeNotification'
  /** The liked thread comment */
  readonly comment?: Maybe<ThreadComment>
  /** The notification context text */
  readonly context?: Maybe<Scalars['String']['output']>
  /** The time the notification was created at */
  readonly createdAt?: Maybe<Scalars['Int']['output']>
  /** The id of the Notification */
  readonly id: Scalars['Int']['output']
  /** The thread that the relevant comment belongs to */
  readonly thread?: Maybe<Thread>
  /** The id of the thread which was liked */
  readonly threadId: Scalars['Int']['output']
  /** The type of notification */
  readonly type?: Maybe<NotificationType | `${NotificationType}`>
  /** The user who liked the activity */
  readonly user?: Maybe<User>
  /** The id of the user who liked to the activity */
  readonly userId: Scalars['Int']['output']
}

/** Thread sort enums */
export type ThreadSort =
  | 'CREATED_AT'
  | 'CREATED_AT_DESC'
  | 'ID'
  | 'ID_DESC'
  | 'IS_STICKY'
  | 'REPLIED_AT'
  | 'REPLIED_AT_DESC'
  | 'REPLY_COUNT'
  | 'REPLY_COUNT_DESC'
  | 'SEARCH_MATCH'
  | 'TITLE'
  | 'TITLE_DESC'
  | 'UPDATED_AT'
  | 'UPDATED_AT_DESC'
  | 'VIEW_COUNT'
  | 'VIEW_COUNT_DESC'

/** A user */
export type User = {
  readonly __typename?: 'User'
  /** The bio written by user (Markdown) */
  readonly about?: Maybe<Scalars['String']['output']>
  /** The user's avatar images */
  readonly avatar?: Maybe<UserAvatar>
  /** The user's banner images */
  readonly bannerImage?: Maybe<Scalars['String']['output']>
  readonly bans?: Maybe<Scalars['Json']['output']>
  /** When the user's account was created. (Does not exist for accounts created before 2020) */
  readonly createdAt?: Maybe<Scalars['Int']['output']>
  /** Custom donation badge text */
  readonly donatorBadge?: Maybe<Scalars['String']['output']>
  /** The donation tier of the user */
  readonly donatorTier?: Maybe<Scalars['Int']['output']>
  /** The users favourites */
  readonly favourites?: Maybe<Favourites>
  /** The id of the user */
  readonly id: Scalars['Int']['output']
  /** If the user is blocked by the authenticated user */
  readonly isBlocked?: Maybe<Scalars['Boolean']['output']>
  /** If this user if following the authenticated user */
  readonly isFollower?: Maybe<Scalars['Boolean']['output']>
  /** If the authenticated user if following this user */
  readonly isFollowing?: Maybe<Scalars['Boolean']['output']>
  /** The user's media list options */
  readonly mediaListOptions?: Maybe<MediaListOptions>
  /** The user's moderator roles if they are a site moderator */
  readonly moderatorRoles?: Maybe<ReadonlyArray<Maybe<ModRole | `${ModRole}`>>>
  /**
   * If the user is a moderator or data moderator
   * @deprecated Deprecated. Replaced with moderatorRoles field.
   */
  readonly moderatorStatus?: Maybe<Scalars['String']['output']>
  /** The name of the user */
  readonly name: Scalars['String']['output']
  /** The user's general options */
  readonly options?: Maybe<UserOptions>
  /** The user's previously used names. */
  readonly previousNames?: Maybe<ReadonlyArray<Maybe<UserPreviousName>>>
  /** The url for the user page on the AniList website */
  readonly siteUrl?: Maybe<Scalars['String']['output']>
  /** The users anime & manga list statistics */
  readonly statistics?: Maybe<UserStatisticTypes>
  /**
   * The user's statistics
   * @deprecated Deprecated. Replaced with statistics field.
   */
  readonly stats?: Maybe<UserStats>
  /** The number of unread notifications the user has */
  readonly unreadNotificationCount?: Maybe<Scalars['Int']['output']>
  /** When the user's data was last updated */
  readonly updatedAt?: Maybe<Scalars['Int']['output']>
}

/** A user */
export type UserAboutArgs = {
  asHtml?: InputMaybe<Scalars['Boolean']['input']>
}

/** A user */
export type UserFavouritesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>
}

/** A user's activity history stats. */
export type UserActivityHistory = {
  readonly __typename?: 'UserActivityHistory'
  /** The amount of activity on the day */
  readonly amount?: Maybe<Scalars['Int']['output']>
  /** The day the activity took place (Unix timestamp) */
  readonly date?: Maybe<Scalars['Int']['output']>
  /** The level of activity represented on a 1-10 scale */
  readonly level?: Maybe<Scalars['Int']['output']>
}

/** A user's avatars */
export type UserAvatar = {
  readonly __typename?: 'UserAvatar'
  /** The avatar of user at its largest size */
  readonly large?: Maybe<Scalars['String']['output']>
  /** The avatar of user at medium size */
  readonly medium?: Maybe<Scalars['String']['output']>
}

export type UserCountryStatistic = {
  readonly __typename?: 'UserCountryStatistic'
  readonly chaptersRead: Scalars['Int']['output']
  readonly count: Scalars['Int']['output']
  readonly country?: Maybe<Scalars['CountryCode']['output']>
  readonly meanScore: Scalars['Float']['output']
  readonly mediaIds: ReadonlyArray<Maybe<Scalars['Int']['output']>>
  readonly minutesWatched: Scalars['Int']['output']
}

export type UserFormatStatistic = {
  readonly __typename?: 'UserFormatStatistic'
  readonly chaptersRead: Scalars['Int']['output']
  readonly count: Scalars['Int']['output']
  readonly format?: Maybe<MediaFormat | `${MediaFormat}`>
  readonly meanScore: Scalars['Float']['output']
  readonly mediaIds: ReadonlyArray<Maybe<Scalars['Int']['output']>>
  readonly minutesWatched: Scalars['Int']['output']
}

export type UserGenreStatistic = {
  readonly __typename?: 'UserGenreStatistic'
  readonly chaptersRead: Scalars['Int']['output']
  readonly count: Scalars['Int']['output']
  readonly genre?: Maybe<Scalars['String']['output']>
  readonly meanScore: Scalars['Float']['output']
  readonly mediaIds: ReadonlyArray<Maybe<Scalars['Int']['output']>>
  readonly minutesWatched: Scalars['Int']['output']
}

export type UserLengthStatistic = {
  readonly __typename?: 'UserLengthStatistic'
  readonly chaptersRead: Scalars['Int']['output']
  readonly count: Scalars['Int']['output']
  readonly length?: Maybe<Scalars['String']['output']>
  readonly meanScore: Scalars['Float']['output']
  readonly mediaIds: ReadonlyArray<Maybe<Scalars['Int']['output']>>
  readonly minutesWatched: Scalars['Int']['output']
}

/** User data for moderators */
export type UserModData = {
  readonly __typename?: 'UserModData'
  readonly alts?: Maybe<ReadonlyArray<Maybe<User>>>
  readonly bans?: Maybe<Scalars['Json']['output']>
  readonly counts?: Maybe<Scalars['Json']['output']>
  readonly email?: Maybe<Scalars['String']['output']>
  readonly ip?: Maybe<Scalars['Json']['output']>
  readonly privacy?: Maybe<Scalars['Int']['output']>
}

/** A user's general options */
export type UserOptions = {
  readonly __typename?: 'UserOptions'
  /** Minutes between activity for them to be merged together. 0 is Never, Above 2 weeks (20160 mins) is Always. */
  readonly activityMergeTime?: Maybe<Scalars['Int']['output']>
  /** Whether the user receives notifications when a show they are watching aires */
  readonly airingNotifications?: Maybe<Scalars['Boolean']['output']>
  /** The list activity types the user has disabled from being created from list updates */
  readonly disabledListActivity?: Maybe<ReadonlyArray<Maybe<ListActivityOption>>>
  /** Whether the user has enabled viewing of 18+ content */
  readonly displayAdultContent?: Maybe<Scalars['Boolean']['output']>
  /** Notification options */
  readonly notificationOptions?: Maybe<ReadonlyArray<Maybe<NotificationOption>>>
  /** Profile highlight color (blue, purple, pink, orange, red, green, gray) */
  readonly profileColor?: Maybe<Scalars['String']['output']>
  /** Whether the user only allow messages from users they follow */
  readonly restrictMessagesToFollowing?: Maybe<Scalars['Boolean']['output']>
  /** The language the user wants to see staff and character names in */
  readonly staffNameLanguage?: Maybe<UserStaffNameLanguage | `${UserStaffNameLanguage}`>
  /** The user's timezone offset (Auth user only) */
  readonly timezone?: Maybe<Scalars['String']['output']>
  /** The language the user wants to see media titles in */
  readonly titleLanguage?: Maybe<UserTitleLanguage | `${UserTitleLanguage}`>
}

/** A user's previous name */
export type UserPreviousName = {
  readonly __typename?: 'UserPreviousName'
  /** When the user first changed from this name. */
  readonly createdAt?: Maybe<Scalars['Int']['output']>
  /** A previous name of the user. */
  readonly name?: Maybe<Scalars['String']['output']>
  /** When the user most recently changed from this name. */
  readonly updatedAt?: Maybe<Scalars['Int']['output']>
}

export type UserReleaseYearStatistic = {
  readonly __typename?: 'UserReleaseYearStatistic'
  readonly chaptersRead: Scalars['Int']['output']
  readonly count: Scalars['Int']['output']
  readonly meanScore: Scalars['Float']['output']
  readonly mediaIds: ReadonlyArray<Maybe<Scalars['Int']['output']>>
  readonly minutesWatched: Scalars['Int']['output']
  readonly releaseYear?: Maybe<Scalars['Int']['output']>
}

export type UserScoreStatistic = {
  readonly __typename?: 'UserScoreStatistic'
  readonly chaptersRead: Scalars['Int']['output']
  readonly count: Scalars['Int']['output']
  readonly meanScore: Scalars['Float']['output']
  readonly mediaIds: ReadonlyArray<Maybe<Scalars['Int']['output']>>
  readonly minutesWatched: Scalars['Int']['output']
  readonly score?: Maybe<Scalars['Int']['output']>
}

/** User sort enums */
export type UserSort =
  | 'CHAPTERS_READ'
  | 'CHAPTERS_READ_DESC'
  | 'ID'
  | 'ID_DESC'
  | 'SEARCH_MATCH'
  | 'USERNAME'
  | 'USERNAME_DESC'
  | 'WATCHED_TIME'
  | 'WATCHED_TIME_DESC'

/** The language the user wants to see staff and character names in */
export type UserStaffNameLanguage =
  /** The staff or character's name in their native language */
  | 'NATIVE'
  /** The romanization of the staff or character's native name */
  | 'ROMAJI'
  /** The romanization of the staff or character's native name, with western name ordering */
  | 'ROMAJI_WESTERN'

export type UserStaffStatistic = {
  readonly __typename?: 'UserStaffStatistic'
  readonly chaptersRead: Scalars['Int']['output']
  readonly count: Scalars['Int']['output']
  readonly meanScore: Scalars['Float']['output']
  readonly mediaIds: ReadonlyArray<Maybe<Scalars['Int']['output']>>
  readonly minutesWatched: Scalars['Int']['output']
  readonly staff?: Maybe<Staff>
}

export type UserStartYearStatistic = {
  readonly __typename?: 'UserStartYearStatistic'
  readonly chaptersRead: Scalars['Int']['output']
  readonly count: Scalars['Int']['output']
  readonly meanScore: Scalars['Float']['output']
  readonly mediaIds: ReadonlyArray<Maybe<Scalars['Int']['output']>>
  readonly minutesWatched: Scalars['Int']['output']
  readonly startYear?: Maybe<Scalars['Int']['output']>
}

export type UserStatisticTypes = {
  readonly __typename?: 'UserStatisticTypes'
  readonly anime?: Maybe<UserStatistics>
  readonly manga?: Maybe<UserStatistics>
}

export type UserStatistics = {
  readonly __typename?: 'UserStatistics'
  readonly chaptersRead: Scalars['Int']['output']
  readonly count: Scalars['Int']['output']
  readonly countries?: Maybe<ReadonlyArray<Maybe<UserCountryStatistic>>>
  readonly episodesWatched: Scalars['Int']['output']
  readonly formats?: Maybe<ReadonlyArray<Maybe<UserFormatStatistic>>>
  readonly genres?: Maybe<ReadonlyArray<Maybe<UserGenreStatistic>>>
  readonly lengths?: Maybe<ReadonlyArray<Maybe<UserLengthStatistic>>>
  readonly meanScore: Scalars['Float']['output']
  readonly minutesWatched: Scalars['Int']['output']
  readonly releaseYears?: Maybe<ReadonlyArray<Maybe<UserReleaseYearStatistic>>>
  readonly scores?: Maybe<ReadonlyArray<Maybe<UserScoreStatistic>>>
  readonly staff?: Maybe<ReadonlyArray<Maybe<UserStaffStatistic>>>
  readonly standardDeviation: Scalars['Float']['output']
  readonly startYears?: Maybe<ReadonlyArray<Maybe<UserStartYearStatistic>>>
  readonly statuses?: Maybe<ReadonlyArray<Maybe<UserStatusStatistic>>>
  readonly studios?: Maybe<ReadonlyArray<Maybe<UserStudioStatistic>>>
  readonly tags?: Maybe<ReadonlyArray<Maybe<UserTagStatistic>>>
  readonly voiceActors?: Maybe<ReadonlyArray<Maybe<UserVoiceActorStatistic>>>
  readonly volumesRead: Scalars['Int']['output']
}

export type UserStatisticsCountriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<UserStatisticsSort>>>
}

export type UserStatisticsFormatsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<UserStatisticsSort>>>
}

export type UserStatisticsGenresArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<UserStatisticsSort>>>
}

export type UserStatisticsLengthsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<UserStatisticsSort>>>
}

export type UserStatisticsReleaseYearsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<UserStatisticsSort>>>
}

export type UserStatisticsScoresArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<UserStatisticsSort>>>
}

export type UserStatisticsStaffArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<UserStatisticsSort>>>
}

export type UserStatisticsStartYearsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<UserStatisticsSort>>>
}

export type UserStatisticsStatusesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<UserStatisticsSort>>>
}

export type UserStatisticsStudiosArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<UserStatisticsSort>>>
}

export type UserStatisticsTagsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<UserStatisticsSort>>>
}

export type UserStatisticsVoiceActorsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<UserStatisticsSort>>>
}

/** User statistics sort enum */
export type UserStatisticsSort =
  | 'COUNT'
  | 'COUNT_DESC'
  | 'ID'
  | 'ID_DESC'
  | 'MEAN_SCORE'
  | 'MEAN_SCORE_DESC'
  | 'PROGRESS'
  | 'PROGRESS_DESC'

/** A user's statistics */
export type UserStats = {
  readonly __typename?: 'UserStats'
  readonly activityHistory?: Maybe<ReadonlyArray<Maybe<UserActivityHistory>>>
  readonly animeListScores?: Maybe<ListScoreStats>
  readonly animeScoreDistribution?: Maybe<ReadonlyArray<Maybe<ScoreDistribution>>>
  readonly animeStatusDistribution?: Maybe<ReadonlyArray<Maybe<StatusDistribution>>>
  /** The amount of manga chapters the user has read */
  readonly chaptersRead?: Maybe<Scalars['Int']['output']>
  readonly favouredActors?: Maybe<ReadonlyArray<Maybe<StaffStats>>>
  readonly favouredFormats?: Maybe<ReadonlyArray<Maybe<FormatStats>>>
  readonly favouredGenres?: Maybe<ReadonlyArray<Maybe<GenreStats>>>
  readonly favouredGenresOverview?: Maybe<ReadonlyArray<Maybe<GenreStats>>>
  readonly favouredStaff?: Maybe<ReadonlyArray<Maybe<StaffStats>>>
  readonly favouredStudios?: Maybe<ReadonlyArray<Maybe<StudioStats>>>
  readonly favouredTags?: Maybe<ReadonlyArray<Maybe<TagStats>>>
  readonly favouredYears?: Maybe<ReadonlyArray<Maybe<YearStats>>>
  readonly mangaListScores?: Maybe<ListScoreStats>
  readonly mangaScoreDistribution?: Maybe<ReadonlyArray<Maybe<ScoreDistribution>>>
  readonly mangaStatusDistribution?: Maybe<ReadonlyArray<Maybe<StatusDistribution>>>
  /** The amount of anime the user has watched in minutes */
  readonly watchedTime?: Maybe<Scalars['Int']['output']>
}

export type UserStatusStatistic = {
  readonly __typename?: 'UserStatusStatistic'
  readonly chaptersRead: Scalars['Int']['output']
  readonly count: Scalars['Int']['output']
  readonly meanScore: Scalars['Float']['output']
  readonly mediaIds: ReadonlyArray<Maybe<Scalars['Int']['output']>>
  readonly minutesWatched: Scalars['Int']['output']
  readonly status?: Maybe<MediaListStatus | `${MediaListStatus}`>
}

export type UserStudioStatistic = {
  readonly __typename?: 'UserStudioStatistic'
  readonly chaptersRead: Scalars['Int']['output']
  readonly count: Scalars['Int']['output']
  readonly meanScore: Scalars['Float']['output']
  readonly mediaIds: ReadonlyArray<Maybe<Scalars['Int']['output']>>
  readonly minutesWatched: Scalars['Int']['output']
  readonly studio?: Maybe<Studio>
}

export type UserTagStatistic = {
  readonly __typename?: 'UserTagStatistic'
  readonly chaptersRead: Scalars['Int']['output']
  readonly count: Scalars['Int']['output']
  readonly meanScore: Scalars['Float']['output']
  readonly mediaIds: ReadonlyArray<Maybe<Scalars['Int']['output']>>
  readonly minutesWatched: Scalars['Int']['output']
  readonly tag?: Maybe<MediaTag>
}

/** The language the user wants to see media titles in */
export type UserTitleLanguage =
  /** The official english title */
  | 'ENGLISH'
  /** The official english title, stylised by media creator */
  | 'ENGLISH_STYLISED'
  /** Official title in it's native language */
  | 'NATIVE'
  /** Official title in it's native language, stylised by media creator */
  | 'NATIVE_STYLISED'
  /** The romanization of the native language title */
  | 'ROMAJI'
  /** The romanization of the native language title, stylised by media creator */
  | 'ROMAJI_STYLISED'

export type UserVoiceActorStatistic = {
  readonly __typename?: 'UserVoiceActorStatistic'
  readonly chaptersRead: Scalars['Int']['output']
  readonly characterIds: ReadonlyArray<Maybe<Scalars['Int']['output']>>
  readonly count: Scalars['Int']['output']
  readonly meanScore: Scalars['Float']['output']
  readonly mediaIds: ReadonlyArray<Maybe<Scalars['Int']['output']>>
  readonly minutesWatched: Scalars['Int']['output']
  readonly voiceActor?: Maybe<Staff>
}

/** User's year statistics */
export type YearStats = {
  readonly __typename?: 'YearStats'
  readonly amount?: Maybe<Scalars['Int']['output']>
  readonly meanScore?: Maybe<Scalars['Int']['output']>
  readonly year?: Maybe<Scalars['Int']['output']>
}

export type GetGenresQueryVariables = Exact<{ [key: string]: never }>

export type GetGenresQuery = {
  readonly __typename?: 'Query'
  readonly GenreCollection?: ReadonlyArray<string | null> | null
}

export type SearchQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<MediaType>
  isAdult?: InputMaybe<Scalars['Boolean']['input']>
  sort?: InputMaybe<ReadonlyArray<InputMaybe<MediaSort>> | InputMaybe<MediaSort>>
  page?: InputMaybe<Scalars['Int']['input']>
  statusIn?: InputMaybe<ReadonlyArray<InputMaybe<MediaStatus>> | InputMaybe<MediaStatus>>
  formatIn?: InputMaybe<ReadonlyArray<InputMaybe<MediaFormat>> | InputMaybe<MediaFormat>>
  idMalNot?: InputMaybe<Scalars['Int']['input']>
  idMalIn?: InputMaybe<
    ReadonlyArray<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>
  >
}>

export type SearchQuery = {
  readonly __typename?: 'Query'
  readonly Page?: {
    readonly __typename?: 'Page'
    readonly pageInfo?: {
      readonly __typename?: 'PageInfo'
      readonly total?: number | null
      readonly perPage?: number | null
      readonly currentPage?: number | null
      readonly lastPage?: number | null
      readonly hasNextPage?: boolean | null
    } | null
    readonly media?: ReadonlyArray<{
      readonly __typename?: 'Media'
      readonly id: number
      readonly idMal?: number | null
      readonly description?: string | null
      readonly meanScore?: number | null
      readonly type?: MediaType | null
      readonly status?: MediaStatus | null
      readonly genres?: ReadonlyArray<string | null> | null
      readonly format?: MediaFormat | null
      readonly episodes?: number | null
      readonly season?: MediaSeason | null
      readonly seasonYear?: number | null
      readonly isAdult?: boolean | null
      readonly duration?: number | null
      readonly bannerImage?: string | null
      readonly title?: {
        readonly __typename?: 'MediaTitle'
        readonly english?: string | null
        readonly romaji?: string | null
        readonly native?: string | null
      } | null
      readonly startDate?: {
        readonly __typename?: 'FuzzyDate'
        readonly year?: number | null
        readonly month?: number | null
        readonly day?: number | null
      } | null
      readonly endDate?: {
        readonly __typename?: 'FuzzyDate'
        readonly year?: number | null
        readonly month?: number | null
        readonly day?: number | null
      } | null
      readonly coverImage?: {
        readonly __typename?: 'MediaCoverImage'
        readonly extraLarge?: string | null
        readonly large?: string | null
        readonly medium?: string | null
      } | null
      readonly airingSchedule?: {
        readonly __typename?: 'AiringScheduleConnection'
        readonly nodes?: ReadonlyArray<{
          readonly __typename?: 'AiringSchedule'
          readonly airingAt: number
          readonly episode: number
          readonly timeUntilAiring: number
        } | null> | null
      } | null
      readonly trailer?: {
        readonly __typename?: 'MediaTrailer'
        readonly site?: string | null
        readonly id?: string | null
      } | null
      readonly relations?: {
        readonly __typename?: 'MediaConnection'
        readonly edges?: ReadonlyArray<{
          readonly __typename?: 'MediaEdge'
          readonly relationType?: MediaRelation | null
          readonly node?: {
            readonly __typename?: 'Media'
            readonly id: number
            readonly idMal?: number | null
            readonly type?: MediaType | null
            readonly title?: {
              readonly __typename?: 'MediaTitle'
              readonly romaji?: string | null
            } | null
          } | null
        } | null> | null
      } | null
      readonly recommendations?: {
        readonly __typename?: 'RecommendationConnection'
        readonly edges?: ReadonlyArray<{
          readonly __typename?: 'RecommendationEdge'
          readonly node?: {
            readonly __typename?: 'Recommendation'
            readonly mediaRecommendation?: {
              readonly __typename?: 'Media'
              readonly id: number
              readonly idMal?: number | null
              readonly type?: MediaType | null
              readonly title?: {
                readonly __typename?: 'MediaTitle'
                readonly romaji?: string | null
              } | null
            } | null
          } | null
        } | null> | null
      } | null
    } | null> | null
  } | null
}

export const GetGenresDocument = gql`
  query GetGenres {
    GenreCollection
  }
`
export const SearchDocument = gql`
  query Search(
    $search: String
    $type: MediaType
    $isAdult: Boolean
    $sort: [MediaSort]
    $page: Int
    $statusIn: [MediaStatus]
    $formatIn: [MediaFormat]
    $idMalNot: Int
    $idMalIn: [Int]
  ) {
    Page(page: $page) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(
        search: $search
        type: $type
        isAdult: $isAdult
        sort: $sort
        status_in: $statusIn
        format_in: $formatIn
        idMal_not: $idMalNot
        idMal_in: $idMalIn
      ) {
        id
        idMal
        title {
          english
          romaji
          native
        }
        description
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        meanScore
        type
        status
        genres
        format
        episodes
        coverImage {
          extraLarge
          large
          medium
        }
        season
        seasonYear
        airingSchedule {
          nodes {
            airingAt
            episode
            timeUntilAiring
          }
        }
        isAdult
        trailer {
          site
          id
        }
        duration
        bannerImage
        relations {
          edges {
            relationType
            node {
              id
              idMal
              title {
                romaji
              }
              type
            }
          }
        }
        recommendations {
          edges {
            node {
              mediaRecommendation {
                title {
                  romaji
                }
                id
                idMal
                type
              }
            }
          }
        }
      }
    }
  }
`
export type Requester<C = {}> = <R, V>(
  doc: DocumentNode,
  vars?: V,
  options?: C
) => Promise<R> | AsyncIterable<R>
export function getSdk<C>(requester: Requester<C>) {
  return {
    GetGenres(variables?: GetGenresQueryVariables, options?: C): Promise<GetGenresQuery> {
      return requester<GetGenresQuery, GetGenresQueryVariables>(
        GetGenresDocument,
        variables,
        options
      ) as Promise<GetGenresQuery>
    },
    Search(variables?: SearchQueryVariables, options?: C): Promise<SearchQuery> {
      return requester<SearchQuery, SearchQueryVariables>(
        SearchDocument,
        variables,
        options
      ) as Promise<SearchQuery>
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
