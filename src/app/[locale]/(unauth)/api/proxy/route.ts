import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function GET() {
  try {
    // Fetch the HTML from Pantip
    const response = await fetch('https://pantip.com');
    const html = await response.text();

    // Load HTML into Cheerio
    const $ = cheerio.load(html);
    const nextDataScript: any = $('#__NEXT_DATA__').html();
    const nextData = JSON.parse(nextDataScript);
    // Return the extracted data as JSON
    return NextResponse.json({ nextData }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: `Error fetching data: ${error.message}` }, { status: 500 });
  }
}
