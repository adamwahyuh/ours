import Content from "./content.json";

const content: any = Content;

interface ContentResponse<T> {
    statusCode: number;
    data: T;
}

const contentNotFound = {
    message: "Content not found"
};

const errorNotFound : ContentResponse<any> = {
    statusCode : 404,
    data : contentNotFound
}

const getPage = (pageName: string = ""): ContentResponse<any> => {
    const page = content[pageName];

    if (!page) {
        return errorNotFound;
    }

    return {
        statusCode: 200,
        data: page
    };
};

const getEverySectionsInPage = (pageName: string): ContentResponse<any> => {
    const sections = content[pageName]?.sections;

    if (!sections) {
        return errorNotFound;
    }

    return {
        statusCode: 200,
        data: sections
    };
};

const getContentFromSectionPage = (pageName: string, sectionName: string): ContentResponse<any> => {
    const section = content[pageName]?.sections?.[sectionName];

    if (!section) {
        return errorNotFound;
    }

    return {
        statusCode: 200,
        data: section
    };
};

export { getContentFromSectionPage, getPage, getEverySectionsInPage}