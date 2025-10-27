// clientu.c (client UDP)

#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <string.h>
#include <sys/socket.h>
#include <time.h>

#include "cJSON-master/cJSON.h"

char *id = 0;
char *truc;
short sport = 0;

int sock = 0; /* socket de communication */

int main(int argc, char **argv)
{
    struct sockaddr_in moi;     /* SAP du client */
    struct sockaddr_in serveur; /* SAP du serveur */
    int nb_question = 0;
    int ret, len;
    int serveur_len = sizeof(serveur);
    char buf_read[1 << 8], buf_write[1 << 8];

    if (argc != 3)
    {
        fprintf(stderr, "usage: %s host sport\n", argv[0]);
        exit(1);
    }

    sport = atoi(argv[2]);

    if ((sock = socket(AF_INET, SOCK_DGRAM, 0)) == -1)
    {
        fprintf(stderr, "\n%s: socket %s\n", argv[0], strerror(errno));
        exit(1);
    }
    len = sizeof(moi);
    getsockname(sock, (struct sockaddr *)&moi, &len);

    serveur.sin_family = AF_INET;
    serveur.sin_port = htons(sport);
    inet_aton(argv[1], &serveur.sin_addr);

    struct timespec *tim;

    (*tim).tv_sec = 0;
    (*tim).tv_nsec = 15000000;

    // Récupérer les données
    int speed_kmh = 100;
    int current_gear = 2;
    int current_position = 1;
    float current_fuel = 120.0;
    int TC = 12;
    int ABS = 12;
    float throttle = 0.0;
    float brake = 0.0;
    int engineMap = 1;
    float fuelPerLap = 2.0;
    float fuelCapacity = 120.0;
    int lap = 1;
    float lapTime = 1.0;
    float deltaBestLap = 1.0;
    float bestLap = 180;
    float brakeBias = 0.3;
    float flTyrePressure = 0.01;
    float flTyreTemperature = 60.0;
    float frTyrePressure = 0.01;
    float frTyreTemperature = 60.0;
    float rlTyrePressure = 0.01;
    float rlTyreTemperature = 60.0;
    float rrTyrePressure = 0.01;
    float rrTyreTemperature = 60.0;
    int headLight = 0;

    while (1)
    {
        cJSON *json = cJSON_CreateObject();
        char buf_read[1 << 8], buf_write[1 << 8];

        flTyreTemperature += 0.5;
        frTyreTemperature += 0.5;
        rlTyreTemperature += 0.5;
        rrTyreTemperature += 0.5;

        if (flTyreTemperature > 110.0)
        {
            flTyreTemperature = 60.0;
            frTyreTemperature = 60.0;
            rlTyreTemperature = 60.0;
            rrTyreTemperature = 60.0;
        }

        flTyrePressure += 0.01;
        frTyrePressure += 0.01;
        rlTyrePressure += 0.01;
        rrTyrePressure += 0.01;

        if (flTyrePressure > 3.0)
        {
            flTyrePressure = 0.01;
            frTyrePressure = 0.01;
            rlTyrePressure = 0.01;
            rrTyrePressure = 0.01;
        }

        speed_kmh += 1;
        if (speed_kmh > 300)
        {
            speed_kmh = 0;
        }
        if (speed_kmh % 40 == 0)
        {
            current_gear += 1;
            current_position++;
            ABS--;
            TC--;
            throttle += 0.1;
            brake += 0.1;
            engineMap += 1;
            lap += 1;
            deltaBestLap += 0.01;
            headLight++;
        }
        if (current_gear > 7)
        {
            current_gear = -2;
        }

        if (current_position == 30)
        {
            current_position = 1;
        }

        current_fuel -= 0.01;

        if (current_fuel <= 0.0)
        {
            current_fuel = 120.0;
            lap = 0;
        }

        if (ABS == 0 || TC == 0)
        {
            ABS = 12;
            TC = 12;
        }

        if (throttle >= 1)
        {
            throttle = 0.0;
            brake = 0.0;
            engineMap = 1;
        }

        if(headLight == 2)
        {
            headLight = 0;
        }

        lapTime += 0.015;

        // Préparer les données pour le JSON
        cJSON_AddNumberToObject(json, "speed", speed_kmh);
        cJSON_AddNumberToObject(json, "gear", current_gear);
        cJSON_AddNumberToObject(json, "position", current_position);
        cJSON_AddNumberToObject(json, "remainingFuel", round(current_fuel * 10.0) / 10.0);
        cJSON_AddNumberToObject(json, "tc", TC);
        cJSON_AddNumberToObject(json, "abs", ABS);
        cJSON_AddNumberToObject(json, "throttle", throttle);
        cJSON_AddNumberToObject(json, "brake", brake);
        cJSON_AddNumberToObject(json, "engineMap", engineMap);
        cJSON_AddNumberToObject(json, "fuelPerLap", fuelPerLap);
        cJSON_AddNumberToObject(json, "fuelCapacity", fuelCapacity);
        cJSON_AddNumberToObject(json, "lap", lap);
        cJSON_AddNumberToObject(json, "lapTime", lapTime);
        cJSON_AddNumberToObject(json, "deltaBestLap", deltaBestLap);
        cJSON_AddNumberToObject(json, "bestLap", bestLap);
        cJSON_AddNumberToObject(json, "brakeBias", brakeBias);
        cJSON_AddNumberToObject(json, "flTyrePressure", flTyrePressure);
        cJSON_AddNumberToObject(json, "flTyreTemperature", flTyreTemperature);
        cJSON_AddNumberToObject(json, "frTyrePressure", frTyrePressure);
        cJSON_AddNumberToObject(json, "frTyreTemperature", frTyreTemperature);
        cJSON_AddNumberToObject(json, "rlTyrePressure", rlTyrePressure);
        cJSON_AddNumberToObject(json, "rlTyreTemperature", rlTyreTemperature);
        cJSON_AddNumberToObject(json, "rrTyrePressure", rrTyrePressure);
        cJSON_AddNumberToObject(json, "rrTyreTemperature", rrTyreTemperature);
        cJSON_AddNumberToObject(json, "headLight", headLight);
        

        char *json_string = cJSON_PrintUnformatted(json);

        // Envoyer les données
        sendto(sock, json_string, (int)strlen(json_string), 0, (struct sockaddr *)&serveur, serveur_len);

        // Nettoyer la mémoire pour ce tour de boucle
        free(json_string);
        cJSON_Delete(json);

        // MODIF WINDOWS: Remplacer nanosleep par Sleep() (en millisecondes)
        nanosleep(tim, NULL);
    }
    printf("j ai fini bye\n");
    return 0;
}

// gcc -w clientu_trous.c cJSON-master/cJSON.c -o udp_dev_linux -lm
// cJSON-master/cJSON.c