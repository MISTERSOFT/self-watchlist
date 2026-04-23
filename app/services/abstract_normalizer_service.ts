export abstract class AbstractNormalizerService<TModel, TIn> {
  abstract normalize(data: TIn[]): Promise<Partial<TModel>[]>
  abstract normalize(data: TIn): Promise<Partial<TModel>>
}
