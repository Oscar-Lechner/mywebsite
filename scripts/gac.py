import pandas as pd
from sklearn.utils import shuffle

# Function to create balanced teams
def create_teams(participants, team_size=5):
    # Shuffle the participant list for randomness
    participants_shuffled = shuffle(participants)

    # Allocate participants to teams
    teams = [participants_shuffled.iloc[i::team_size] for i in range(team_size)]
    return teams

# Path to your CSV file
file_path = 'C:\\Users\\oscar\\OneDrive\\Documents\\GitHub\\mywebsite\\scripts\\gac.csv'

# Read the CSV file
df = pd.read_csv(file_path)

# Rename columns to remove spaces and convert to lowercase for easier access
# You will need to replace the column names with the actual column names from your CSV
df.columns = [col.strip().replace(' ', '_').lower() for col in df.columns]

# Filter out participants who are not attending
df = df[df['will_you_be_attending_ga'].str.lower() == 'yes']

# Keep only the first name
df['first_name'] = df['name'].apply(lambda x: x.split()[0])

# Assuming abilities are rated from 1 to 5, otherwise adjust accordingly
# Map 'hardcover', 'softcover', 'audiobook' columns to their respective ability ratings
df['hardcover'] = df['hardcover'].astype(int)
df['softcover'] = df['softcover'].astype(int)
df['audiobook'] = df['audiobook'].astype(int)

# Create a list of participants with their abilities
participants = df[['first_name', 'hardcover', 'softcover', 'audiobook']]

# Create teams
teams = create_teams(participants)

# Print teams
print(f'There are {len(teams)} teams:')
for i, team in enumerate(teams, start=1):
    print(f"\nTeam {i}:")
    for index, member in team.iterrows():
        print(f"  {member['first_name']} (Hard: {member['hardcover']}, Beer: {member['softcover']}, Weed: {member['audiobook']})")
