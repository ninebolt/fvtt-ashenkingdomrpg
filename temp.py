import requests
import json

def get_spells():
    spell_url = "https://api.ashenkingdoms.com/v1/spells"
    headers = {"Accept": "application/json"}
    response = requests.get(url=spell_url, headers=headers, verify=False)

    if response.status_code >= 400:
        raise RuntimeError(f"Unable to call AshRPG spell API, reason: {response.json()}")

    return response.json()

def parse_components(components=''):
    split_str = list(map(lambda x : x.strip(),components.split(',')))

    return {
        'verbal': 'V' in split_str,
        'somatic': 'S' in split_str,
        'material': 'M' in split_str
    }


spells_to_create = []

for spell in get_spells():
    del spell['_id']
    del spell['lastModified']
    spell['components'] = parse_components(spell.get('components'))
    spell['concentration'] = spell.get('concentration', False)
    spell['type'] = 'spell'

    spells_to_create.append(spell)

with open('spell-output.json', 'w') as f:
    f.write(json.dumps(spells_to_create))
