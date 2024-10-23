import type { Struct, Schema } from '@strapi/strapi';

export interface ProjectPageLinks extends Struct.ComponentSchema {
  collectionName: 'components_project_page_links';
  info: {
    displayName: 'Links';
  };
  attributes: {
    link1: Schema.Attribute.String;
    link2: Schema.Attribute.String;
    link3: Schema.Attribute.String;
  };
}

export interface ProjectPageLinking extends Struct.ComponentSchema {
  collectionName: 'components_project_page_linkings';
  info: {
    displayName: 'linking';
  };
  attributes: {
    link1: Schema.Attribute.String;
    link2: Schema.Attribute.String;
    link3: Schema.Attribute.String;
  };
}

export interface ProjectPageInformation extends Struct.ComponentSchema {
  collectionName: 'components_project_page_information';
  info: {
    displayName: 'information';
  };
  attributes: {
    info1: Schema.Attribute.Text;
    info2: Schema.Attribute.Text;
    info3: Schema.Attribute.Text;
  };
}

export interface ProjectPageImages extends Struct.ComponentSchema {
  collectionName: 'components_project_page_images';
  info: {
    displayName: 'images';
    description: '';
  };
  attributes: {
    image1: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    image2: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    image3: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

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

export interface ContactPageNames extends Struct.ComponentSchema {
  collectionName: 'components_contact_page_names';
  info: {
    displayName: 'names';
  };
  attributes: {
    name1: Schema.Attribute.String;
    name2: Schema.Attribute.String;
    name3: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'project-page.links': ProjectPageLinks;
      'project-page.linking': ProjectPageLinking;
      'project-page.information': ProjectPageInformation;
      'project-page.images': ProjectPageImages;
      'header.header-names': HeaderHeaderNames;
      'header.header-images': HeaderHeaderImages;
      'contact-page.names': ContactPageNames;
    }
  }
}
