import moment from "moment";

export function formatTopicList(data: any[]) {
    const formattedData = data.map(topic => {
        const description = topic.description.substring(0, 120).concat(' ...');
        const createdAt = moment(topic.created_at).format('dddd, DD MMMM YYYY h:mm A');

        return {
            id: topic.id,
            name: topic.name,
            description,
            image: topic.image,
            createdAt,
        };
    });

    return formattedData;
};
