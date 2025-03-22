//Mapping utilities for mapping Open Libary API subjects to genres

//genreToKeywordsMap maps from genres to arrays of keywords
const genreToKeywordsMap = {
    //Action & Adventure
    'Action & Adventure' : [
        'action',
        'adventure',
        'action and adventure',
        'actionandadventure',
        'action & adventure',
        'action&adventure'
    ],

    //Activity & Game Books
    'Activity & Game Books' : [
        'activity books', 
        'game books', 
    ],

    //African-American Studies
    'African-American Studies' : [
        'african american', 
        'black history', 
        'civil rights', 
        'black culture', 
        'african diaspora', 
        'racial justice', 
        'black identity', 
        'black feminism', 
        'african-american literature', 
        'african-american history', 
        'black studies',
        'african american authors'
    ],

    //Art, Architecture & Photography
    'Art, Architecture & Photography' : [
        'art', 
        'architecture', 
        'design', 
        'photography', 
        'modern art', 
        'fine art', 
        'graphic design', 
        'painting', 
        'sculpture', 
        'illustration', 
        'art history', 
        'digital art', 
        'urban design', 
        'interior design', 
        'landscape photography', 
        'fashion photography'
    ],

    //Biography
    'Biography' : [
        'biographies',
        'bios', 
        'biography',
    ],

    //Business Books
    'Business Books' : [
        'business books',
        'business-books',
        'business',
        'finance',
        'entrepreneurship',
        'marketing'
    ],

    //Children's
    "Children's" : [
        "children's",
        "kids",
        "children's books",
        "kids books",
    ],

    //Classics
    "Classics" : [
        'classics',
    ],

    //Comics
    "Comic Books" : [
        'comics',
        'comic books',
        'comic book', 
        'comicbooks',
        'comicbook'
    ],

    //Contemporary fiction
    'Contemporary Fiction' : [
        'contemporaryfiction', 
        'contemporary fiction'
    ],

    //Cookbooks, Food & Wine
    "Cookbooks, Food & Wine" :[
        'cookbooks',
    ],

    //Crafts & Hobbies
    'Crafts & Hobbies' : [
        'crafts',
        'hobbies',
        'crafts and hobbies',
        'crafts & hobbies',
        'craftsandhobbies',
        'crafts&hobbies'
    ],

    //Current Affairs & Politics
    'Current Affairs & Politics' : [
        'politics',
        'currentaffairs',
        'current affairs',
        'current affairs and politics',
        'current affiars & politics'
    ],

    //Crime
    "Crime" : [
        'crime'
    ],

    //Diet, Health & Fitness
    'Diet, Health & Fitness' : [
        'diet',
        'health',
        'fitness',
        'diet, health and fitness',
        'heath and fitness'
    ],

    //Educational
    'Education' : [
        'educational',
        'education'
    ],

    //Fantasy
    'Fantasy' : [
        'fantasy'
    ],
    
    //Fiction 
    'Fiction' : [
        'fiction',
        'contemporaryfiction', 
        'contemporary fiction',
        'literary fiction', 
        'literaryfiction',
        'scifi', 
        'sci fi', 
        'sci-fi', 
        'science fiction', 
        'sciencefiction',
        "women's fiction", 
        "womens fiction",
    ],

    //Folklore & Mythology
    'Folklore & Mythology' : [
        'folklore',
        'mythology',
        'folklore and mythology',
        'folklore & mythology'
    ],

    //Graphic novels
    'Graphic Novels' : [
        'graphicnovels',
        'graphic novels',
        'graphic novel',
        'graphicnovel'
    ],

    //Historical fiction
    'Historical Fiction' : [
        'historical fiction', 
        'historicalfiction'
    ],
    
    //History
    'History' : [
        'history'
    ],

    //Home & Garden
    'Home & Garden' : [
        'home and garden',
        'home & garden',
        'garden',
        'home',
    ],
    
    //Horror
    'Horror' : [
        'horror'
    ],

    //Humor & Comedy
    'Humor & Comedy' : [
        'humor',
        'comedy',
        'humor & comedy',
        'humor and comedy',
        'humore&comedy',
        'humor&comedy'
    ],

    //Language
    'Language' : [
        'language', 
        'foreign language',
        'foreignlanguage',
        'languagelearning'
    ],

    //Law
    'Law' : [
        'law'
    ],

    //LGTBQ+
    'LGTBQ+' : [
        'LGBTQ+',
        'lgbtq+',
        'LGBTQ',
        'lgbtq',
        'gay',
        'queer',
        'lesbian',
        'trans',
        'transgender',
        'nonbinary',
        'non-binary',
        'genderqueer',
        'intersex',
        'pansexual',
        'asexual',
        'ace',
        'mlm',
        'wlw', 
        'sapphic', 
        'lgbt romance', 
        'gay romance', 
        'lesbian romance', 
        'transgender fiction'
    ],

    //Literary fiction
    'Literary Fiction' : [
        'literary fiction', 
        'literaryfiction'
    ],

    //Manga
    'Manga' : [
        'manga'
    ],

    //Math
    'Math' : [
        'math'
    ],

    //Medicine & Nursing Books
    'Medicine & Nursing Books' : [
        'medicine',
        'nursing',
        'medical',

    ],

    //Memoir
    'Memoir' : [
        'memoir',
        'memoirs'
    ],

    //Music
    'Music' : [
        'music',
    ],

    //Mystery
    'Mystery' : [
        'mystery'
    ],

    //Nature
    'Nature' : [
        'nature',
        'animals',
        'environment'
    ],

    //Non-Fiction
    'Non-Fiction' : [
        'nonfiction',
        'non fiction',
        'non-fiction'
    ],

    //Paranormal
    'Paranormal' : [
        'paranormal'
    ],

    //Philosophy
    'Philosophy' : [
        'philosophy'
    ],

    //Poetry
    'Poetry' : [
        'poetry',
        'poems'
    ],

    //Psychology
    'Psychology' : [
        'psychology'
    ],

    //Religion
    "Religion" : [
        'religion'
    ],

    //Romance
    'Romance' : [
        'romance'
    ],

    //Science
    'Science' : [
        'science'
    ],

    //Science fiction
    'Science Fiction': [
        'scifi', 
        'sci fi', 
        'sci-fi', 
        'science fiction', 
        'sciencefiction'
    ],

    //Self-help & personal development
    'Self-Help & Personal Development' : [
        'selfhelp', 
        'self-help', 
        'personaldevelopment', 
        'personal development',
        'self help & personal development',
        'self-help & personal development',
        'selfhelp & personal development',
        'self help and personal development',
        'self-help and personal development',
        'selfhelp and personal development',
        'self help&personal development',
        'self-help&personal development',
        'selfhelp&personal development',
        'self helpandpersonal development',
        'self-helpandpersonal development',
        'selfhelpandpersonal development',
        'selfhelpandpersonaldevelopment',
        'selfhelp&personaldevelopment',
    ],

    //Suspense
    'Suspense' : [
        'suspense'
    ],

    //Spirituality
    'Spirituality' : [
        'spirituality',
        'spiritualism'
    ],

    //Sports
    'Sports' : [
        'sports',
    ],

    //Technology
    "Technology" : [
        'computers',
        'IT',
        'programming',
        'coding',
        'technology'
    ],

    //Thriller
    'Thriller' : [
        'thriller'
    ],

    //Travel
    'Travel' : [
        'travel',
    ],

    //Western
    'Western' : [
        'western'
    ],

    // Women's Fiction
    "Women's Fiction" : [
        "women's fiction", 
        "womens fiction",
    ],

    //Young Adult (YA)
    'Young Adult (YA)' : [
        'young adult',
        'youngadult',
        'ya',
        'young adult (ya)',
        'young-adult',
        'young adult fiction'
    ],
}

//keywordToGenresMap maps from keyword to genre
const keywordGenreMap = {} 

for (const [genre, keywords] of Object.entries(genreToKeywordsMap)) {
    keywords.forEach(keyword => {
        keywordGenreMap[keyword.toLowerCase()] = genre;
    })
}

module.exports = {
    keywordGenreMap,
}