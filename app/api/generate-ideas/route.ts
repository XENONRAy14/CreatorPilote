import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    // Vérifier que la clé API existe
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not defined")
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      )
    }

    const { platform, niche } = await req.json()

    if (!platform || !niche) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      )
    }

    console.log("Generating ideas for:", { platform, niche })

    const prompt = `Tu es un expert en création de contenu pour ${platform === "instagram" ? "Instagram" : "TikTok"}.

Génère exactement 10 idées de ${platform === "instagram" ? "posts/reels Instagram" : "vidéos TikTok"} pour la niche "${niche}".

Critères :
- Idées accrocheuses et virales
- Adaptées à ${platform === "instagram" ? "Instagram (Reels, Stories, Posts)" : "TikTok (format court, tendances)"}
- Titres courts et percutants (max 60 caractères)
- Orientées engagement et croissance

Format de réponse :
Retourne UNIQUEMENT une liste numérotée de 1 à 10, une idée par ligne.
Exemple :
1. Ma routine matinale de créateur
2. 5 erreurs à éviter quand on débute
3. etc.

Ne génère QUE les idées, pas d'introduction ni de conclusion.`

    // Appel direct à l'API REST Gemini avec le modèle 2.5 Flash (le plus récent)
    const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`
    
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Gemini API Error:", errorData)
      throw new Error(errorData.error?.message || "Erreur API Gemini")
    }

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ""

    // Extraire les idées
    const lines = text.split("\n")
    const ideas: string[] = []

    for (const line of lines) {
      const match = line.match(/^\d+\.\s*(.+)$/)
      if (match && ideas.length < 10) {
        ideas.push(match[1].trim())
      }
    }

    console.log(`Generated ${ideas.length} ideas`)

    return NextResponse.json({ ideas })
  } catch (error: any) {
    console.error("Erreur génération:", error)
    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    )
  }
}
