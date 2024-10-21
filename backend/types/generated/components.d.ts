import type { Struct, Schema } from '@strapi/strapi';

export interface HeaderHeaderNames extends Struct.ComponentSchema {
  collectionName: 'components_header_header_names';
  info: {
    displayName: 'headerNames';
    icon: 'apps';
  };
  attributes: {
    Home: Schema.Attribute.String;
    Overmij: Schema.Attribute.String;
    Mijnwerk: Schema.Attribute.String;
    Contact: Schema.Attribute.String;
  };
}

export interface HeaderHeaderImages extends Struct.ComponentSchema {
  collectionName: 'components_header_header_images';
  info: {
    displayName: 'headerImages';
  };
  attributes: {
    overMij: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    mijnWerk: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    contact: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'header.header-names': HeaderHeaderNames;
      'header.header-images': HeaderHeaderImages;
    }
  }
}
