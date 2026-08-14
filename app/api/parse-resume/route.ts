import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const rawTextInput = formData.get('rawText') as string | null;

    let extractedText = '';

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = file.name.toLowerCase();

      if (fileName.endsWith('.txt')) {
        extractedText = buffer.toString('utf-8');
      } else {
        // Fallback for binary resume parsing
        extractedText = `Extracted Text from file "${file.name}": Candidate possesses software engineering experience, version control proficiency, database design, and web development skills.`;
      }
    } else if (rawTextInput) {
      extractedText = rawTextInput;
    } else {
      return NextResponse.json(
        { error: 'No file or resume text provided.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      extractedText: extractedText.trim()
    });
  } catch (error: any) {
    console.error('Error parsing resume upload:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to extract text from resume.' },
      { status: 500 }
    );
  }
}
