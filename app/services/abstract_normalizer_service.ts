export abstract class AbstractNormalizerService<TModel, TIn, TOutNormalized> {
  abstract normalizeData(data: TIn[]): Promise<TOutNormalized[]>
  abstract normalize(data: TIn): Partial<TModel>
}
