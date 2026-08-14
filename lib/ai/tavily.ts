export interface TavilySearchResult {
  title: string;
  url: string;
  content: string;
}

export const isTavilyConfigured = (): boolean => {
  const key = process.env.TAVILY_API_KEY;
  return Boolean(key && key.trim() !== '' && key !== 'your_actual_key_here');
};

/**
 * Search Tavily API for real, current online courses and resources for a skill gap query.
 */
export async function searchTavilyResources(
  skillName: string,
  targetRole: string
): Promise<TavilySearchResult[]> {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey || apiKey === 'your_actual_key_here') {
    console.log('[Tavily] TAVILY_API_KEY not configured. Skipping live search grounding.');
    return [];
  }

  const query = `best online course or documentation for ${skillName} in ${targetRole} 2026`;

  try {
    const res = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        api_key: apiKey,
        query,
        search_depth: 'basic',
        max_results: 3
      })
    });

    if (!res.ok) {
      console.warn(`[Tavily] Search failed with status ${res.status}: ${await res.text()}`);
      return [];
    }

    const data = await res.json();
    const results: TavilySearchResult[] = (data.results || []).map((r: any) => ({
      title: r.title || 'Learning Resource',
      url: r.url || '#',
      content: r.content || ''
    }));

    return results;
  } catch (error) {
    console.error('[Tavily] Error calling search API:', error);
    return [];
  }
}
