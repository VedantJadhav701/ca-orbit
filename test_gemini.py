from google import genai
client = genai.Client(api_key='AIzaSyCBYksOwyow9fUUSyV4zgRK5OabIdagfUI')
try:
    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents="Say hello!"
    )
    print("GEMINI SUCCESS:", response.text)
except Exception as e:
    print("GEMINI ERROR:", e)
