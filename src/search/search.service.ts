import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(
    private readonly esService: ElasticsearchService,
    private readonly configService: ConfigService,
  ) {}

  public async createIndex() {
    const index = this.configService.get('ELASTICSEARCH_INDEX');
    const checkIndex = await this.esService.indices.exists({ index });
    if (checkIndex.statusCode === 404) {
      this.esService.indices.create(
        {
          index,
          body: {},
        },
        (err: any) => {
          if (err) {
            console.log(err);
          }
        },
      );
    }
  }
}
