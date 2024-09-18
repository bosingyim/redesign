import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function GET(req: Request, { params }: { params: { room: string } }) {
  const room = params.room;
  req.headers.set('content-type', 'application/json');
  try {
    // Fetch the HTML from Pantip
    const response = await fetch('https://pantip.com/forum/' + room);
    const html = await response.text();

    // Load HTML into Cheerio
    const $ = cheerio.load(html);
    const nextDataScript: any = $('#__NEXT_DATA__').html();
    const nextData = JSON.parse(nextDataScript);
    // Return the extracted data as JSON
    return NextResponse.json({ nextData : nextData.props.initialProps.pageProps }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: `Error fetching data: ${error.message}` }, { status: 500 });
  }
}
