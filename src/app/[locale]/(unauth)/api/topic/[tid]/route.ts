import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function GET(req: Request, { params }: { params: { tid: string } }) {
  const topicId = params.tid;
  req.headers.set('content-type', 'application/json');
  try {
    // Fetch the HTML from Pantip
    const response = await fetch(`https://pantip.com/topic/${topicId}`);
    const html = await response.text();

    // Load HTML into Cheerio
    const $ = cheerio.load(html);
    const title: string = $('h2.display-post-title').text();
    const story: string = $('div.display-post-story').text();
    const author: string = $('a.display-post-name.owner').text();
    const imageUrl: string = $('a.signature-user img').attr('src') || '';
    const profileId: string = $('a.display-post-name.owner').attr('href')?.split('/profile/')[1] || '';
    const postDate: string = $('span.display-post-timestamp abbr').attr('title') || '';
    const likeCount: string = $('span.like-score').text();
    const emotionCount: string = $('span.emotion-score').text();

    const topicData = {
      title,
      story,
      postDate,
      author: {
        name: author,
        imageUrl,
        profileId,
      },
      likeCount,
      emotionCount,
    };

    return NextResponse.json(topicData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: `Error fetching data: ${error.message}` }, { status: 500 });
  }
}
