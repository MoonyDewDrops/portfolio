import type { Struct, Schema } from '@strapi/strapi';

export interface ProjectPageInformation extends Struct.ComponentSchema {
  collectionName: 'components_project_page_information';
  info: {
    displayName: 'information';
    description: '';
  };
  attributes: {
    info1: Schema.Attribute.Blocks;
    info2: Schema.Attribute.Blocks;
    info3: Schema.Attribute.Blocks;
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

export interface ProjectPageFinished extends Struct.ComponentSchema {
  collectionName: 'components_project_page_finisheds';
  info: {
    displayName: 'finished';
    description: '';
  };
  attributes: {
    live1: Schema.Attribute.Boolean;
    live2: Schema.Attribute.Boolean;
    live3: Schema.Attribute.Boolean;
  };
}

export interface ProjectPageDateMade extends Struct.ComponentSchema {
  collectionName: 'components_project_page_date_mades';
  info: {
    displayName: 'dateMade';
    description: '';
  };
  attributes: {
    dateMade1: Schema.Attribute.Date;
    dateMade2: Schema.Attribute.Date;
    dateMade3: Schema.Attribute.Date;
  };
}

export interface ProjectPageDateFinished extends Struct.ComponentSchema {
  collectionName: 'components_project_page_date_finisheds';
  info: {
    displayName: 'DateFinished';
  };
  attributes: {
    dateFinished1: Schema.Attribute.Date;
    dateFinished2: Schema.Attribute.Date;
    dateFinished3: Schema.Attribute.Date;
  };
}

export interface ContactPageNames extends Struct.ComponentSchema {
  collectionName: 'components_contact_page_names';
  info: {
    displayName: 'names';
    description: '';
  };
  attributes: {
    name1: Schema.Attribute.String;
    name2: Schema.Attribute.String;
  };
}

export interface ContactPageLinks extends Struct.ComponentSchema {
  collectionName: 'components_contact_page_links';
  info: {
    displayName: 'links';
  };
  attributes: {
    link1: Schema.Attribute.String;
    link2: Schema.Attribute.String;
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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'project-page.information': ProjectPageInformation;
      'project-page.images': ProjectPageImages;
      'project-page.finished': ProjectPageFinished;
      'project-page.date-made': ProjectPageDateMade;
      'project-page.date-finished': ProjectPageDateFinished;
      'contact-page.names': ContactPageNames;
      'contact-page.links': ContactPageLinks;
      'header.header-names': HeaderHeaderNames;
      'header.header-images': HeaderHeaderImages;
    }
  }
}
