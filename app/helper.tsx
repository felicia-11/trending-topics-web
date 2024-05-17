export function formatTopicList(data: any[]) {
    const formattedData = data.map(topic => {
        const description = topic.description.substring(0, 180).concat(' ...');

        return {
            id: topic.id,
            name: topic.name,
            description,
            image: topic.image,
            createdAt: topic.created_at,
        };
    });

    return formattedData;
};
