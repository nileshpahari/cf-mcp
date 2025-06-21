export enum ContestType {
  CF = "CF",
  IOI = "IOI",
  ICPC = "ICPC",
}

export enum ContestPhase {
  BEFORE = "BEFORE",
  CODING = "CODING",
  PENDING_SYSTEM_TEST = "PENDING_SYSTEM_TEST",
  SYSTEM_TEST = "SYSTEM_TEST",
  FINISHED = "FINISHED",
}

export enum ParticipantType {
  CONTESTANT = "CONTESTANT",
  PRACTICE = "PRACTICE",
  VIRTUAL = "VIRTUAL",
  MANAGER = "MANAGER",
  OUT_OF_COMPETITION = "OUT_OF_COMPETITION",
}

export enum ProblemType {
  PROGRAMMING = "PROGRAMMING",
  QUESTION = "QUESTION",
}

export enum Verdict {
  FAILED = "FAILED",
  OK = "OK",
  PARTIAL = "PARTIAL",
  COMPILATION_ERROR = "COMPILATION_ERROR",
  RUNTIME_ERROR = "RUNTIME_ERROR",
  WRONG_ANSWER = "WRONG_ANSWER",
  TIME_LIMIT_EXCEEDED = "TIME_LIMIT_EXCEEDED",
  MEMORY_LIMIT_EXCEEDED = "MEMORY_LIMIT_EXCEEDED",
  IDLENESS_LIMIT_EXCEEDED = "IDLENESS_LIMIT_EXCEEDED",
  SECURITY_VIOLATED = "SECURITY_VIOLATED",
  CRASHED = "CRASHED",
  INPUT_PREPARATION_CRASHED = "INPUT_PREPARATION_CRASHED",
  CHALLENGED = "CHALLENGED",
  SKIPPED = "SKIPPED",
  TESTING = "TESTING",
  REJECTED = "REJECTED",
  SUBMITTED = "SUBMITTED",
}

export enum HackVerdict {
  HACK_SUCCESSFUL = "HACK_SUCCESSFUL",
  HACK_UNSUCCESSFUL = "HACK_UNSUCCESSFUL",
  INVALID_INPUT = "INVALID_INPUT",
  GENERATOR_INCOMPILABLE = "GENERATOR_INCOMPILABLE",
  GENERATOR_CRASHED = "GENERATOR_CRASHED",
  IGNORED = "IGNORED",
  TESTING = "TESTING",
  OTHER = "OTHER",
}

export enum ProblemResultType {
  PRELIMINARY = "PRELIMINARY",
  FINAL = "FINAL",
}

export enum Testset {
  SAMPLES = "SAMPLES",
  PRETESTS = "PRETESTS",
  TESTS = "TESTS",
  CHALLENGES = "CHALLENGES",
  TESTS1 = "TESTS1",
  TESTS2 = "TESTS2",
  TESTS3 = "TESTS3",
  TESTS4 = "TESTS4",
  TESTS5 = "TESTS5",
  TESTS6 = "TESTS6",
  TESTS7 = "TESTS7",
  TESTS8 = "TESTS8",
  TESTS9 = "TESTS9",
  TESTS10 = "TESTS10",
}

export interface User {
  handle: string;
  email?: string;
  vkId?: string;
  openId?: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  city?: string;
  organization?: string;
  contribution: number;
  rank: string;
  rating: number;
  maxRank: string;
  maxRating: number;
  lastOnlineTimeSeconds: number;
  registrationTimeSeconds: number;
  friendOfCount: number;
  avatar: string;
  titlePhoto: string;
}

export interface BlogEntry {
  id: number;
  originalLocale: string;
  creationTimeSeconds: number;
  authorHandle: string;
  title: string;
  content?: string;
  locale: string;
  modificationTimeSeconds: number;
  allowViewHistory: boolean;
  tags: string[];
  rating: number;
}

export interface Comment {
  id: number;
  creationTimeSeconds: number;
  commentatorHandle: string;
  locale: string;
  text: string;
  parentCommentId?: number;
  rating: number;
}

export interface RecentAction {
  timeSeconds: number;
  blogEntry?: BlogEntry;
  comment?: Comment;
}

export interface RatingChange {
  contestId: number;
  contestName: string;
  handle: string;
  rank: number;
  ratingUpdateTimeSeconds: number;
  oldRating: number;
  newRating: number;
}

export interface Contest {
  id: number;
  name: string;
  type: ContestType;
  phase: ContestPhase;
  frozen: boolean;
  durationSeconds: number;
  freezeDurationSeconds?: number;
  startTimeSeconds?: number;
  relativeTimeSeconds?: number;
  preparedBy?: string;
  websiteUrl?: string;
  description?: string;
  difficulty?: number;
  kind?: string;
  icpcRegion?: string;
  country?: string;
  city?: string;
  season?: string;
}

export interface Member {
  handle: string;
  name?: string;
}

export interface Party {
  contestId?: number;
  members: Member[];
  participantType: ParticipantType;
  teamId?: number;
  teamName?: string;
  ghost: boolean;
  room?: number;
  startTimeSeconds?: number;
}

export interface Problem {
  contestId?: number;
  problemsetName?: string;
  index: string;
  name: string;
  type: ProblemType;
  points?: number;
  rating?: number;
  tags: string[];
}

export interface ProblemStatistics {
  contestId?: number;
  index: string;
  solvedCount: number;
}
export interface Submission {
  id: number;
  contestId?: number;
  creationTimeSeconds: number;
  relativeTimeSeconds: number;
  problem: Problem;
  author: Party;
  programmingLanguage: string;
  verdict?: Verdict;
  testset: Testset 
  passedTestCount: number;
  timeConsumedMillis: number;
  memoryConsumedBytes: number;
  points?: number;
}

export interface Hack {
  id: number;
  creationTimeSeconds: number;
  hacker: Party;
  defender: Party;
  verdict?: HackVerdict;
  problem: Problem;
  test?: string;
  judgeProtocol?: {
    manual: "true" | "false";
    protocol: string;
    verdict: string;
  };
}

export interface ProblemResult {
  points: number;
  penalty?: number;
  rejectedAttemptCount: number;
  type: ProblemResultType;
  bestSubmissionTimeSeconds?: number;
}

export interface RanklistRow {
  party: Party;
  rank: number;
  points: number;
  penalty: number;
  successfulHackCount: number;
  unsuccessfulHackCount: number;
  problemResults: ProblemResult[];
  lastSubmissionTimeSeconds?: number;
}

export interface Secret {
  apiKey: string;
  apiSecret: string;
}

export interface UserSubmissionProps {
  handle: string;
  from: string;
  count: string;
}