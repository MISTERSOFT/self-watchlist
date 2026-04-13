export abstract class AbtractImporterService {
  abstract fromUsername(url: string): Promise<void>
}
