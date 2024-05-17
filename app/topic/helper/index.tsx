import moment from "moment";

export function formatTopicDetail(data: any) {
    const createdAt = moment(data.created_at).format('ddd, DD MMMM YYYY h:mm A');
    const formattedData = {
        ...data,
        adsImage: data.ads_image,
        createdAt,
        descriptionDetail: data.description_detail,
        dislikes: parseInt(data.dislike_counts, 10),
        imageBy: data.image_by,
        likes: parseInt(data.like_counts, 10),
    };

    return formattedData;
};
