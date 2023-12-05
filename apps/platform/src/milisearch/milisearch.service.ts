import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import MeiliSearch, {
  DocumentOptions,
  DocumentsQuery,
  EnqueuedTask,
  Health,
  Index,
  IndexOptions,
  IndexStats,
  IndexesResults,
  ResourceResults,
  SearchResponse,
  Settings,
} from 'meilisearch';

@Injectable()
export class MilisearchService {
  _client: MeiliSearch;

  constructor(private readonly configService: ConfigService) {
    this._client = new MeiliSearch({
      host: this.configService.get<string>('MELISEARCH_HOST') as string,
      apiKey: this.configService.get<string>('MELISEARCH_API_KEY'),
    });
  }

  get client(): MeiliSearch {
    return this._client;
  }

  async createIndex(
    uid: string,
    primaryKey?: string | undefined,
  ): Promise<EnqueuedTask> {
    return await this._client.createIndex(uid, { primaryKey });
  }

  async getIndex(indexName: string): Promise<Index<Record<string, any>>> {
    return await this._client.getIndex(indexName);
  }

  async getAllIndexes(): Promise<IndexesResults<Index<Record<string, any>>[]>> {
    return await this._client.getIndexes();
  }

  async deleteIndex(indexName: string): Promise<EnqueuedTask> {
    return await this._client.deleteIndex(indexName);
  }

  async getOrCreateIndex(
    indexName: string,
  ): Promise<Index<Record<string, any>> | EnqueuedTask> {
    try {
      return await this._client.getIndex(indexName);
    } catch (error) {
      if (error.errorCode === 'index_not_found') {
        return await this._client.createIndex(indexName);
      }
      throw error;
    }
  }

  async addOrUpdateDocuments(
    indexName: string,
    documents: Partial<Record<string, any>>[],
    options?: DocumentOptions | undefined,
  ): Promise<EnqueuedTask> {
    return await this._client.index(indexName).addDocuments(documents, options);
  }

  // async updateDocuments(
  //   indexName: string,
  //   documents: any[],
  // ): Promise<EnqueuedTask> {
  //   return await this._client.index(indexName).updateDocuments(documents);
  // }

  async deleteDocuments({
    indexName,
    documentsIds,
  }: {
    indexName: string;
    documentsIds: string[];
  }) {
    return await this._client.index(indexName).deleteDocuments(documentsIds);
  }

  async deleteAllDocuments(indexName: string): Promise<EnqueuedTask> {
    return await this._client.index(indexName).deleteAllDocuments();
  }

  async getDocument(
    indexName: string,
    documentId: string,
  ): Promise<Record<string, any>> {
    return await this._client.index(indexName).getDocument(documentId);
  }

  async getDocuments(
    indexName: string,
    parameters?: DocumentsQuery<Record<string, any>> | undefined,
  ): Promise<ResourceResults<Record<string, any>[]>> {
    return await this._client.index(indexName).getDocuments(parameters);
  }

  async getDocumentCount(
    indexName: string,
  ): Promise<Index<Record<string, any>>> {
    return await this._client.index(indexName).fetchInfo();
  }

  async updateDocument(
    indexName: string,
    indexOptions: IndexOptions,
  ): Promise<EnqueuedTask> {
    return await this._client.index(indexName).update(indexOptions);
  }

  async getStats(indexName: string): Promise<IndexStats> {
    return await this._client.index(indexName).getStats();
  }

  async health(): Promise<Health> {
    return await this._client.health();
  }

  async search(
    indexName: string,
    query: string,
    options?: any,
  ): Promise<SearchResponse<Record<string, any>, any>> {
    return await this._client.index(indexName).search(query, options);
  }

  async getSettings(indexName: string): Promise<Settings> {
    return await this._client.index(indexName).getSettings();
  }
}
