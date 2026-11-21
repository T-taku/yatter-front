import { Timeline } from "@/components/Timeline";
import { TimelineFeed } from "@/components/TimelineFeed";
import { Yweet } from "@/types/yweet";

/**
 * タイムライン（ホーム）
 * docs/02_timeline.md を見ながら、ここで API から Yweet を取得して表示する
 */

type TimelineResponse = Yweet[];

export default async function Home() {
	//　　投稿の取得するとこ
	const response = await fetch(
		process.env.NEXT_PUBLIC_API_BASE_URL + "/v1/timelines/public",
	);
	console.log(response);
	const yweets = (await response.json()) as TimelineResponse;
	console.log(yweets);
	return (
		<Timeline>
			<TimelineFeed initialYweets={yweets} />
		</Timeline>
	);
}
